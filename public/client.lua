-- Load API
if fs.exists("json")==false then shell.run("pastebin get h3q4Ed1R json") end
if os.loadAPI("json")==false then error("Failed to load json API") end

local args = {...}

if args[1] == nil then
    error("Please, use:\n <script> {session_key}")
end

-- obj = json.decode('{"payload": "asd"}')


local session_key = args[1]
local url = "wss://socket.cc-visual.dev?session_key=" .. session_key -- Замените на ваш URL веб-сокета
local ws, error = http.websocket(url)

function dd(data)
    print(textutils.serialize(data))
    exit()
end

function getMessage(timeout)
    local message = ws.receive(timeout)

    if message then
        return json.decode(message)
    end

    return nil
end

if not ws then
    error("Cant connect: " .. error)
end

function sendWs(type, data)
    ws.send(json.encode({
        subtype=type,
        data=data,
    }))
end

function report_runtime_line(line)
    sendWs('run_line', line)
end

local RUN_FILE = session_key

function preparePrintStrings(...)
    local str = ""
    for i,v in ipairs(arg) do
        str = str .. tostring(v)
        if i < #arg then
            str = str .. " "
        end
    end
    return str
end

function print(...)
    local str = preparePrintStrings(...)
    sendWs("run_print", str)
    _G.print(str)
end

function printError(...)
    local str = preparePrintStrings(...)
    sendWs("run_print_error", str)
    _G.printError(str)
end

function _highlightBlock(blockId)
    sendWs('log_block', blockId)
    while true do
        local message = getMessage()
        if message.type == "message" then
            if message.data.subtype == "run_next_block" then
                return
            end
        end
        error("Terminated")
    end
end

while true do
    local message = getMessage()
    -- dd(message)

    if message.type == 'message' then
        if message.data.subtype == 'run' then
            package.loaded["/" .. RUN_FILE] = nil
            local file = fs.open(RUN_FILE .. ".lua", "w")

            if file then
                -- Записываем строку в файл
                file.write(message.data.data)
                -- Закрываем файл
                file.close()
            else
                error("Error on open file")
            end

            sendWs("state", "running")

            local ok, error_str = pcall(require, "/" .. RUN_FILE)

            if not ok and error_str then
                sendWs("run_error", error_str)
            end

            fs.delete(RUN_FILE .. ".lua")
            package.loaded["/" .. RUN_FILE] = nil

            sendWs('run_end')
        end
    end
end



if not ok then
    error(error_str)
end