export default [
  {
    name: "sides",
    help_url: null,
    list_docs: [
      { name: "left", type: "const", description: "Just peripheral side" },
      { name: "right", type: "const", description: "Just peripheral side" },
      { name: "back", type: "const", description: "Just peripheral side" },
      { name: "front", type: "const", description: "Just peripheral side" },
      { name: "top", type: "const", description: "Just peripheral side" },
      { name: "bottom", type: "const", description: "Just peripheral side" },
    ],
  },
  {
    name: "_G",
    help_url: "https://tweaked.cc/module/_G.html#v:",
    list_docs: [
      {
        name: "sleep",
        args: [{ arg_name: "time", required: true }],
        type: "function",
        description:
          'Pauses execution for the specified number of seconds.\nAs it waits for a fixed amount of world ticks, time will automatically be\nrounded up to the nearest multiple of 0.05 seconds. If you are using coroutines\nor the parallel API, it will only pause execution of the current\nthread, not the whole program.\ntipBecause sleep internally uses timers, it is a function that yields. This means\nthat you can use it to prevent "Too long without yielding" errors. However, as\nthe minimum sleep time is 0.05 seconds, it will slow your program down.\n\u26a0 warningInternally, this function queues and waits for a timer event (using\nos.startTimer), however it does not listen for any other events. This means\nthat any event that occurs while sleeping will be entirely discarded. If you\nneed to receive events while sleeping, consider using timers,\nor the parallel API.\nParameters\ntime number The number of seconds to sleep for, rounded up to the\nnearest multiple of 0.05.\nUsage\nSleep for three seconds.\nprint("Sleeping for three seconds")\nsleep(3)\nprint("Done!")\nSee also\nos.startTimer ',
      },
      {
        name: "write",
        args: [{ arg_name: "text", required: true }],
        type: "function",
        description:
          'Writes a line of text to the screen without a newline at the end, wrapping\ntext if necessary.\nParameters\ntext string The text to write to the string\nReturns\nnumber The number of lines written\nUsage\nwrite("Hello, world")\nSee also\nprint A wrapper around write that adds a newline and accepts multiple arguments',
      },
      {
        name: "print",
        args: [{ arg_name: "...args", required: false }],
        type: "function",
        description:
          'Prints the specified values to the screen separated by spaces, wrapping if\nnecessary. After printing, the cursor is moved to the next line.\nParameters\n...  The values to print on the screen\nReturns\nnumber The number of lines written\nUsage\nprint("Hello, world!")',
      },
      {
        name: "printError",
        args: [{ arg_name: "...args", required: false }],
        type: "function",
        description:
          'Prints the specified values to the screen in red, separated by spaces,\nwrapping if necessary. After printing, the cursor is moved to the next line.\nParameters\n...  The values to print on the screen\nUsage\nprintError("Something went wrong!")',
      },
      {
        name: "read",
        args: [
          { arg_name: "replaceChar", required: false },
          { arg_name: "history", required: false },
          { arg_name: "completeFn", required: false },
          { arg_name: "default", required: false },
        ],
        type: "function",
        description:
          'Reads user input from the terminal. This automatically handles arrow keys,\npasting, character replacement, history scrollback, auto-completion, and\ndefault values.\nParameters\nreplaceChar? string A character to replace each typed character with.\nThis can be used for hiding passwords, for example.history? table A table holding history items that can be scrolled\nback to with the up/down arrow keys. The oldest item is at index 1, while the\nnewest item is at the highest index.completeFn? function(partial: string):{ string... } | nil A function\nto be used for completion. This function should take the partial text typed so\nfar, and returns a list of possible completion options.default? string Default text which should already be entered into\nthe prompt.\nReturns\nstring The text typed in.\nUsage\nRead a string and echo it back to the user\nwrite("> ")\nlocal msg = read()\nprint(msg)Prompt a user for a password.\nwhile true do\n  write("Password> ")\n  local pwd = read("*")\n  if pwd == "let me in" then break end\n  print("Incorrect password, try again.")\nend\nprint("Logged in!")A complete example with completion, history and a default value.\nlocal completion = require "cc.completion"\nlocal history = { "potato", "orange", "apple" }\nlocal choices = { "apple", "orange", "banana", "strawberry" }\nwrite("> ")\nlocal msg = read(nil, history, function(text) return completion.choice(text, choices) end, "app")\nprint(msg)\nSee also\ncc.completion For functions to help with completion.',
      },
      {
        name: "_HOST",
        type: "const",
        description:
          "Stores the current ComputerCraft and Minecraft versions.\nOutside of Minecraft (for instance, in an emulator) _HOST will contain the\nemulator's version instead.\nFor example, ComputerCraft 1.93.0 (Minecraft 1.15.2).\nUsage\nPrint the current computer's environment.\nprint(_HOST)",
      },
      {
        name: "_CC_DEFAULT_SETTINGS",
        type: "const",
        description:
          "The default computer settings as defined in the ComputerCraft\nconfiguration.\nThis is a comma-separated list of settings pairs defined by the mod\nconfiguration or server owner. By default, it is empty.\nAn example value to disable autocompletion:\nshell.autocomplete=false,lua.autocomplete=false,edit.autocomplete=false\nUsage\n_CC_DEFAULT_SETTINGS",
      },
    ],
  },
  {
    name: "turtle",
    help_url: "https://tweaked.cc/module/turtle.html#v:",
    list_docs: [
      {
        name: "craft",
        args: [{ arg_name: "limit", required: false }],
        type: "function",
        description:
          "Craft a recipe based on the turtle's inventory.\nThe turtle's inventory should set up like a crafting grid. For instance, to\ncraft sticks, slots 1 and 5 should contain planks. All other slots should be\nempty, including those outside the crafting \"grid\".\nParameters\nlimit? number = 64 The maximum number of crafting steps to run.\nReturns\ntrue If crafting succeeds.\nOr\nfalse If crafting fails.string A string describing why crafting failed.\nThrows\nWhen limit is less than 1 or greater than 64.",
      },
      {
        name: "forward",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Move the turtle forward one block.\nReturns\nboolean Whether the turtle could successfully move.string | nil The reason the turtle could not move.",
      },
      {
        name: "back",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Move the turtle backwards one block.\nReturns\nboolean Whether the turtle could successfully move.string | nil The reason the turtle could not move.",
      },
      {
        name: "up",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Move the turtle up one block.\nReturns\nboolean Whether the turtle could successfully move.string | nil The reason the turtle could not move.",
      },
      {
        name: "down",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Move the turtle down one block.\nReturns\nboolean Whether the turtle could successfully move.string | nil The reason the turtle could not move.",
      },
      {
        name: "turnLeft",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Rotate the turtle 90 degrees to the left.\nReturns\nboolean Whether the turtle could successfully turn.string | nil The reason the turtle could not turn.",
      },
      {
        name: "turnRight",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Rotate the turtle 90 degrees to the right.\nReturns\nboolean Whether the turtle could successfully turn.string | nil The reason the turtle could not turn.",
      },
      {
        name: "dig",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          'Attempt to break the block in front of the turtle.\nThis requires a turtle tool capable of breaking the block. Diamond pickaxes\n(mining turtles) can break any vanilla block, but other tools (such as axes)\nare more limited.\nParameters\nside? string The specific tool to use. Should be "left" or "right".\nReturns\nboolean Whether a block was broken.string | nil The reason no block was broken.',
      },
      {
        name: "digUp",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          "Attempt to break the block above the turtle. See dig for full details.\nParameters\nside? string The specific tool to use.\nReturns\nboolean Whether a block was broken.string | nil The reason no block was broken.",
      },
      {
        name: "digDown",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          "Attempt to break the block below the turtle. See dig for full details.\nParameters\nside? string The specific tool to use.\nReturns\nboolean Whether a block was broken.string | nil The reason no block was broken.",
      },
      {
        name: "place",
        args: [{ arg_name: "text", required: false }],
        type: "function",
        description:
          'Place a block or item into the world in front of the turtle.\n"Placing" an item allows it to interact with blocks and entities in front of the turtle. For instance, buckets\ncan pick up and place down fluids, and wheat can be used to breed cows. However, you cannot use place to\nperform arbitrary block interactions, such as clicking buttons or flipping levers.\nParameters\ntext? string When placing a sign, set its contents to this text.\nReturns\nboolean Whether the block could be placed.string | nil The reason the block was not placed.',
      },
      {
        name: "placeUp",
        args: [{ arg_name: "text", required: false }],
        type: "function",
        description:
          "Place a block or item into the world above the turtle.\nParameters\ntext? string When placing a sign, set its contents to this text.\nReturns\nboolean Whether the block could be placed.string | nil The reason the block was not placed.\nSee also\nplace For more information about placing items.",
      },
      {
        name: "placeDown",
        args: [{ arg_name: "text", required: false }],
        type: "function",
        description:
          "Place a block or item into the world below the turtle.\nParameters\ntext? string When placing a sign, set its contents to this text.\nReturns\nboolean Whether the block could be placed.string | nil The reason the block was not placed.\nSee also\nplace For more information about placing items.",
      },
      {
        name: "drop",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if\nthere is no inventory.\nParameters\ncount? number The number of items to drop. If not given, the entire stack will be dropped.\nReturns\nboolean Whether items were dropped.string | nil The reason the no items were dropped.\nThrows\nIf dropping an invalid number of items.\nSee also\nselect ",
      },
      {
        name: "dropUp",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Drop the currently selected stack into the inventory above the turtle, or as an item into the world if there is\nno inventory.\nParameters\ncount? number The number of items to drop. If not given, the entire stack will be dropped.\nReturns\nboolean Whether items were dropped.string | nil The reason the no items were dropped.\nThrows\nIf dropping an invalid number of items.\nSee also\nselect ",
      },
      {
        name: "dropDown",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Drop the currently selected stack into the inventory below the turtle, or as an item into the world if\nthere is no inventory.\nParameters\ncount? number The number of items to drop. If not given, the entire stack will be dropped.\nReturns\nboolean Whether items were dropped.string | nil The reason the no items were dropped.\nThrows\nIf dropping an invalid number of items.\nSee also\nselect ",
      },
      {
        name: "select",
        args: [{ arg_name: "slot", required: true }],
        type: "function",
        description:
          "Change the currently selected slot.\nThe selected slot is determines what slot actions like drop or getItemCount act on.\nParameters\nslot number The slot to select.\nReturns\ntrue When the slot has been selected.\nThrows\nIf the slot is out of range.\nSee also\ngetSelectedSlot ",
      },
      {
        name: "getItemCount",
        args: [{ arg_name: "slot", required: false }],
        type: "function",
        description:
          "Get the number of items in the given slot.\nParameters\nslot? number The slot we wish to check. Defaults to the selected slot.\nReturns\nnumber The number of items in this slot.\nThrows\nIf the slot is out of range.",
      },
      {
        name: "getItemSpace",
        args: [{ arg_name: "slot", required: false }],
        type: "function",
        description:
          "Get the remaining number of items which may be stored in this stack.\nFor instance, if a slot contains 13 blocks of dirt, it has room for another 51.\nParameters\nslot? number The slot we wish to check. Defaults to the selected slot.\nReturns\nnumber The space left in in this slot.\nThrows\nIf the slot is out of range.",
      },
      {
        name: "detect",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if there is a solid block in front of the turtle. In this case, solid refers to any non-air or liquid\nblock.\nReturns\nboolean If there is a solid block in front.",
      },
      {
        name: "detectUp",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if there is a solid block above the turtle. In this case, solid refers to any non-air or liquid block.\nReturns\nboolean If there is a solid block above.",
      },
      {
        name: "detectDown",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if there is a solid block below the turtle. In this case, solid refers to any non-air or liquid block.\nReturns\nboolean If there is a solid block below.",
      },
      {
        name: "compare",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if the block in front of the turtle is equal to the item in the currently selected slot.\nReturns\nboolean If the block and item are equal.",
      },
      {
        name: "compareUp",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if the block above the turtle is equal to the item in the currently selected slot.\nReturns\nboolean If the block and item are equal.",
      },
      {
        name: "compareDown",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Check if the block below the turtle is equal to the item in the currently selected slot.\nReturns\nboolean If the block and item are equal.",
      },
      {
        name: "attack",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          "Attack the entity in front of the turtle.\nParameters\nside? string The specific tool to use.\nReturns\nboolean Whether an entity was attacked.string | nil The reason nothing was attacked.",
      },
      {
        name: "attackUp",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          "Attack the entity above the turtle.\nParameters\nside? string The specific tool to use.\nReturns\nboolean Whether an entity was attacked.string | nil The reason nothing was attacked.",
      },
      {
        name: "attackDown",
        args: [{ arg_name: "side", required: false }],
        type: "function",
        description:
          "Attack the entity below the turtle.\nParameters\nside? string The specific tool to use.\nReturns\nboolean Whether an entity was attacked.string | nil The reason nothing was attacked.",
      },
      {
        name: "suck",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Suck an item from the inventory in front of the turtle, or from an item floating in the world.\nThis will pull items into the first acceptable slot, starting at the currently selected one.\nParameters\ncount? number The number of items to suck. If not given, up to a stack of items will be picked up.\nReturns\nboolean Whether items were picked up.string | nil The reason the no items were picked up.\nThrows\nIf given an invalid number of items.",
      },
      {
        name: "suckUp",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Suck an item from the inventory above the turtle, or from an item floating in the world.\nParameters\ncount? number The number of items to suck. If not given, up to a stack of items will be picked up.\nReturns\nboolean Whether items were picked up.string | nil The reason the no items were picked up.\nThrows\nIf given an invalid number of items.",
      },
      {
        name: "suckDown",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          "Suck an item from the inventory below the turtle, or from an item floating in the world.\nParameters\ncount? number The number of items to suck. If not given, up to a stack of items will be picked up.\nReturns\nboolean Whether items were picked up.string | nil The reason the no items were picked up.\nThrows\nIf given an invalid number of items.",
      },
      {
        name: "getFuelLevel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          'Get the maximum amount of fuel this turtle currently holds.\nReturns\nnumber The current amount of fuel a turtle this turtle has.\nOr\n"unlimited" If turtles do not consume fuel when moving.\nSee also\ngetFuelLimit refuel ',
      },
      {
        name: "refuel",
        args: [{ arg_name: "count", required: false }],
        type: "function",
        description:
          'Refuel this turtle.\nWhile most actions a turtle can perform (such as digging or placing blocks) are free, moving consumes fuel from\nthe turtle\'s internal buffer. If a turtle has no fuel, it will not move.\nrefuel refuels the turtle, consuming fuel items (such as coal or lava buckets) from the currently\nselected slot and converting them into energy. This finishes once the turtle is fully refuelled or all items have\nbeen consumed.\nParameters\ncount? number The maximum number of items to consume. One can pass 0 to check if an item is combustable or not.\nReturns\ntrue If the turtle was refuelled.\nOr\nfalse If the turtle was not refuelled.string The reason the turtle was not refuelled.\nThrows\nIf the refuel count is out of range.\nUsage\nRefuel a turtle from the currently selected slot.\nlocal level = turtle.getFuelLevel()\nif level == "unlimited" then error("Turtle does not need fuel", 0) end\nlocal ok, err = turtle.refuel()\nif ok then\n  local new_level = turtle.getFuelLevel()\n  print(("Refuelled %d, current level is %d"):format(new_level - level, new_level))\nelse\n  printError(err)\nendCheck if the current item is a valid fuel source.\nlocal is_fuel, reason = turtle.refuel(0)\nif not is_fuel then printError(reason) end\nSee also\ngetFuelLevel getFuelLimit ',
      },
      {
        name: "compareTo",
        args: [{ arg_name: "slot", required: true }],
        type: "function",
        description:
          "Compare the item in the currently selected slot to the item in another slot.\nParameters\nslot number The slot to compare to.\nReturns\nboolean If the two items are equal.\nThrows\nIf the slot is out of range.",
      },
      {
        name: "transferTo",
        args: [
          { arg_name: "slot", required: false },
          { arg_name: "count", required: false },
        ],
        type: "function",
        description:
          "Move an item from the selected slot to another one.\nParameters\nslot number The slot to move this item to.count? number The maximum number of items to move.\nReturns\nboolean If some items were successfully moved.\nThrows\nIf the slot is out of range.\nIf the number of items is out of range.",
      },
      {
        name: "getSelectedSlot",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the currently selected slot.\nReturns\nnumber The current slot.\nSee also\nselect ",
      },
      {
        name: "getFuelLimit",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          'Get the maximum amount of fuel this turtle can hold.\nBy default, normal turtles have a limit of 20,000 and advanced turtles of 100,000.\nReturns\nnumber The maximum amount of fuel a turtle can hold.\nOr\n"unlimited" If turtles do not consume fuel when moving.\nSee also\ngetFuelLevel refuel ',
      },
      {
        name: "equipLeft",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Equip (or unequip) an item on the left side of this turtle.\nThis finds the item in the currently selected slot and attempts to equip it to the left side of the turtle. The\nprevious upgrade is removed and placed into the turtle's inventory. If there is no item in the slot, the previous\nupgrade is removed, but no new one is equipped.\nReturns\ntrue If the item was equipped.\nOr\nfalse If we could not equip the item.string The reason equipping this item failed.\nSee also\nequipRight ",
      },
      {
        name: "equipRight",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Equip (or unequip) an item on the right side of this turtle.\nThis finds the item in the currently selected slot and attempts to equip it to the right side of the turtle. The\nprevious upgrade is removed and placed into the turtle's inventory. If there is no item in the slot, the previous\nupgrade is removed, but no new one is equipped.\nReturns\ntrue If the item was equipped.\nOr\nfalse If we could not equip the item.string The reason equipping this item failed.\nSee also\nequipLeft ",
      },
      {
        name: "inspect",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          'Get information about the block in front of the turtle.\nReturns\nboolean Whether there is a block in front of the turtle.table | string Information about the block in front, or a message explaining that there is no block.\nUsage\nlocal has_block, data = turtle.inspect()\nif has_block then\n  print(textutils.serialise(data))\n  -- {\n  --   name = "minecraft:oak_log",\n  --   state = { axis = "x" },\n  --   tags = { ["minecraft:logs"] = true, ... },\n  -- }\nelse\n  print("No block in front of the turtle")\nend',
      },
      {
        name: "inspectUp",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get information about the block above the turtle.\nReturns\nboolean Whether there is a block above the turtle.table | string Information about the above below, or a message explaining that there is no block.",
      },
      {
        name: "inspectDown",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get information about the block below the turtle.\nReturns\nboolean Whether there is a block below the turtle.table | string Information about the block below, or a message explaining that there is no block.",
      },
      {
        name: "getItemDetail",
        args: [
          { arg_name: "slot", required: false },
          { arg_name: "detailed", required: false },
        ],
        type: "function",
        description:
          'Get detailed information about the items in the given slot.\nParameters\nslot? number The slot to get information about. Defaults to the selected slot.detailed? boolean Whether to include "detailed" information. When true the method will contain much\nmore information about the item at the cost of taking longer to run.\nReturns\nnil | table Information about the given slot, or nil if it is empty.\nThrows\nIf the slot is out of range.\nUsage\nPrint the current slot, assuming it contains 13 dirt.\nprint(textutils.serialise(turtle.getItemDetail()))\n-- => {\n--  name = "minecraft:dirt",\n--  count = 13,\n-- }\nSee also\ninventory.getItemDetail Describes the information returned by a detailed query.',
      },
    ],
  },
  {
    name: "gps",
    help_url: "https://tweaked.cc/module/gps.html#v:",
    list_docs: [
      {
        name: "CHANNEL_GPS = 65534",
        type: "const",
        description:
          "The channel which GPS requests and responses are broadcast on.",
      },
      {
        name: "locate",
        args: [
          { arg_name: "timeout", required: false },
          { arg_name: "debug", required: false },
        ],
        type: "function",
        description:
          "Tries to retrieve the computer or turtles own location.\nParameters\ntimeout? number = 2 The maximum time in seconds taken to establish our\nposition.debug? boolean = false Print debugging messages\nReturns\nnumber This computer's x position.number This computer's y position.number This computer's z position.\nOr\nnil If the position could not be established.",
      },
    ],
  },
  {
    name: "os",
    help_url: "https://tweaked.cc/module/os.html#v:",
    list_docs: [
      {
        name: "pullEvent",
        args: [{ arg_name: "filter", required: false }],
        type: "function",
        description:
          'Pause execution of the current thread and waits for any events matching\nfilter.\nThis function yields the current process and waits for it\nto be resumed with a vararg list where the first element matches filter.\nIf no filter is supplied, this will match all events.\nUnlike os.pullEventRaw, it will stop the application upon a "terminate"\nevent, printing the error "Terminated".\nParameters\nfilter? string Event to filter for.\nReturns\nstring event The name of the event that fired.any param... Optional additional parameters of the event.\nUsage\nListen for mouse_click events.\nwhile true do\n    local event, button, x, y = os.pullEvent("mouse_click")\n    print("Button", button, "was clicked at", x, ",", y)\nendListen for multiple events.\nwhile true do\n    local eventData = {os.pullEvent()}\n    local event = eventData[1]\n    if event == "mouse_click" then\n        print("Button", eventData[2], "was clicked at", eventData[3], ",", eventData[4])\n    elseif event == "key" then\n        print("Key code", eventData[2], "was pressed")\n    end\nend\nSee also\nos.pullEventRaw To pull the terminate event.',
      },
      {
        name: "pullEventRaw",
        args: [{ arg_name: "filter", required: false }],
        type: "function",
        description:
          'Pause execution of the current thread and waits for events, including the\nterminate event.\nThis behaves almost the same as os.pullEvent, except it allows you to handle\nthe terminate event yourself - the program will not stop execution when\nCtrl+T is pressed.\nParameters\nfilter? string Event to filter for.\nReturns\nstring event The name of the event that fired.any param... Optional additional parameters of the event.\nUsage\nListen for terminate events.\nwhile true do\n    local event = os.pullEventRaw()\n    if event == "terminate" then\n        print("Caught terminate event!")\n    end\nend\nSee also\nos.pullEvent To pull events normally.',
      },
      {
        name: "sleep",
        args: [{ arg_name: "time", required: true }],
        type: "function",
        description:
          "Pauses execution for the specified number of seconds, alias of _G.sleep.\nParameters\ntime number The number of seconds to sleep for, rounded up to the\nnearest multiple of 0.05.",
      },
      {
        name: "version",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the current CraftOS version (for example, CraftOS 1.9).\nThis is defined by bios.lua. For the current version of CC:Tweaked, this\nshould return CraftOS 1.9.\nReturns\nstring The current CraftOS version.\nUsage\nos.version()",
      },
      {
        name: "run",
        args: [
          { arg_name: "env", required: true },
          { arg_name: "path", required: true },
          { arg_name: "...args", required: false },
        ],
        type: "function",
        description:
          'Run the program at the given path with the specified environment and\narguments.\nThis function does not resolve program names like the shell does. This means\nthat, for example, os.run("edit") will not work. As well as this, it does not\nprovide access to the shell API in the environment. For this behaviour, use\nshell.run instead.\nIf the program cannot be found, or failed to run, it will print the error and\nreturn false. If you want to handle this more gracefully, use an alternative\nsuch as loadfile.\nParameters\nenv table The environment to run the program with.path string The exact path of the program to run....  The arguments to pass to the program.\nReturns\nboolean Whether or not the program ran successfully.\nUsage\nRun the default shell from within your program:\nos.run({}, "/rom/programs/shell.lua")\nSee also\nshell.run loadfile ',
      },
      {
        name: "queueEvent",
        args: [
          { arg_name: "name", required: true },
          { arg_name: "...args", required: false },
        ],
        type: "function",
        description:
          "Adds an event to the event queue. This event can later be pulled with\nos.pullEvent.\nParameters\nname string The name of the event to queue....  The parameters of the event. These can be any primitive type (boolean, number, string) as well as\ntables. Other types (like functions), as well as metatables, will not be preserved.\nSee also\nos.pullEvent To pull the event queued",
      },
      {
        name: "startTimer",
        args: [{ arg_name: "timer", required: true }],
        type: "function",
        description:
          "Starts a timer that will run for the specified number of seconds. Once\nthe timer fires, a timer event will be added to the queue with\nthe ID returned from this function as the first parameter.\nAs with sleep, timer will automatically be rounded up\nto the nearest multiple of 0.05 seconds, as it waits for a fixed amount\nof world ticks.\nParameters\ntimer number The number of seconds until the timer fires.\nReturns\nnumber The ID of the new timer. This can be used to filter the\ntimer event, or cancel the timer.\nThrows\nIf the time is below zero.\nSee also\ncancelTimer To cancel a timer.",
      },
      {
        name: "cancelTimer",
        args: [{ arg_name: "token", required: true }],
        type: "function",
        description:
          "Cancels a timer previously started with startTimer. This will stop the\ntimer from firing.\nParameters\ntoken number The ID of the timer to cancel.\nSee also\nstartTimer To start a timer.",
      },
      {
        name: "setAlarm",
        args: [{ arg_name: "time", required: true }],
        type: "function",
        description:
          "Sets an alarm that will fire at the specified in-game time. When it\nfires, * an alarm event will be added to the event queue with the\nID * returned from this function as the first parameter.\nParameters\ntime number The time at which to fire the alarm, in the range [0.0, 24.0).\nReturns\nnumber The ID of the new alarm. This can be used to filter the\nalarm event, or cancel the alarm.\nThrows\nIf the time is out of range.\nSee also\ncancelAlarm To cancel an alarm.",
      },
      {
        name: "cancelAlarm",
        args: [{ arg_name: "token", required: true }],
        type: "function",
        description:
          "Cancels an alarm previously started with setAlarm. This will stop the\nalarm from firing.\nParameters\ntoken number The ID of the alarm to cancel.\nSee also\nsetAlarm To set an alarm.",
      },
      {
        name: "shutdown",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Shuts down the computer immediately.",
      },
      {
        name: "reboot",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Reboots the computer immediately.",
      },
      {
        name: "getComputerID",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the ID of the computer.\nReturns\nnumber The ID of the computer.",
      },
      {
        name: "computerID",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the ID of the computer.\nReturns\nnumber The ID of the computer.",
      },
      {
        name: "getComputerLabel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the label of the computer, or nil if none is set.\nReturns\nstring | nil The label of the computer.",
      },
      {
        name: "computerLabel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the label of the computer, or nil if none is set.\nReturns\nstring | nil The label of the computer.",
      },
      {
        name: "setComputerLabel",
        args: [{ arg_name: "label", required: false }],
        type: "function",
        description:
          "Set the label of this computer.\nParameters\nlabel? string The new label. May be nil in order to clear it.",
      },
      {
        name: "clock",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the number of seconds that the computer has been running.\nReturns\nnumber The computer's uptime.",
      },
      {
        name: "time",
        args: [{ arg_name: "locale", required: false }],
        type: "function",
        description:
          'Returns the current time depending on the string passed in. This will\nalways be in the range [0.0, 24.0).\nIf called with ingame, the current world time will be returned.\nThis is the default if nothing is passed.\nIf called with utc, returns the hour of the day in UTC time.\nIf called with local, returns the hour of the day in the\ntimezone the server is located in.\nThis function can also be called with a table returned from date,\nwhich will convert the date fields into a UNIX timestamp (number of\nseconds since 1 January 1970).\nParameters\nlocale? string | table The locale of the time, or a table filled by os.date("*t") to decode. Defaults to ingame locale if not specified.\nReturns\nany The hour of the selected locale, or a UNIX timestamp from the table, depending on the argument passed in.\nThrows\nIf an invalid locale is passed.\nUsage\nPrint the current in-game time.\ntextutils.formatTime(os.time())\nSee also\ntextutils.formatTime To convert times into a user-readable string.date To get a date table that can be converted with this function.',
      },
      {
        name: "day",
        args: [{ arg_name: "args", required: false }],
        type: "function",
        description:
          "Returns the day depending on the locale specified.\nIf called with ingame, returns the number of days since the\nworld was created. This is the default.\nIf called with utc, returns the number of days since 1 January\n1970 in the UTC timezone.\nIf called with local, returns the number of days since 1\nJanuary 1970 in the server's local timezone.\nParameters\nargs? string The locale to get the day for. Defaults to ingame if not set.\nReturns\nnumber The day depending on the selected locale.\nThrows\nIf an invalid locale is passed.",
      },
      {
        name: "epoch",
        args: [{ arg_name: "args", required: false }],
        type: "function",
        description:
          'Returns the number of milliseconds since an epoch depending on the locale.\nIf called with ingame, returns the number of in-game milliseconds since the\nworld was created. This is the default.\nIf called with utc, returns the number of milliseconds since 1\nJanuary 1970 in the UTC timezone.\nIf called with local, returns the number of milliseconds since 1\nJanuary 1970 in the server\'s local timezone.\n\ud83d\udec8 infoThe ingame time zone assumes that one Minecraft day consists of 86,400,000\nmilliseconds. Since one in-game day is much faster than a real day (20 minutes), this\nwill change quicker than real time - one real second is equal to 72000 in-game\nmilliseconds. If you wish to convert this value to real time, divide by 72000; to\nconvert to ticks (where a day is 24000 ticks), divide by 3600.\nParameters\nargs? string The locale to get the milliseconds for. Defaults to ingame if not set.\nReturns\nnumber The milliseconds since the epoch depending on the selected locale.\nThrows\nIf an invalid locale is passed.\nUsage\nGet the current time and use date to convert it to a table.\n-- Dividing by 1000 converts it from milliseconds to seconds.\nlocal time = os.epoch("local") / 1000\nlocal time_table = os.date("*t", time)\nprint(textutils.serialize(time_table))',
      },
      {
        name: "date",
        args: [
          { arg_name: "format", required: false },
          { arg_name: "time", required: false },
        ],
        type: "function",
        description:
          'Returns a date string (or table) using a specified format string and\noptional time to format.\nThe format string takes the same formats as C\'s strftime function\n(http://www.cplusplus.com/reference/ctime/strftime/). In extension, it\ncan be prefixed with an exclamation mark (!) to use UTC time\ninstead of the server\'s local timezone.\nIf the format is exactly *t (optionally prefixed with !), a\ntable will be returned instead. This table has fields for the year, month,\nday, hour, minute, second, day of the week, day of the year, and whether\nDaylight Savings Time is in effect. This table can be converted to a UNIX\ntimestamp (days since 1 January 1970) with date.\nParameters\nformat? string The format of the string to return. This defaults to %c, which expands to a string similar to "Sat Dec 24 16:58:00 2011".time? number The time to convert to a string. This defaults to the current time.\nReturns\nany The resulting format string.\nThrows\nIf an invalid format is passed.\nUsage\nPrint the current date in a user-friendly string.\nos.date("%A %d %B %Y") -- See the reference above!',
      },
    ],
  },
  {
    name: "peripheral",
    help_url: "https://tweaked.cc/module/peripheral.html#v:",
    list_docs: [
      {
        name: "getNames",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Provides a list of all peripherals available.\nIf a device is located directly next to the system, then its name will be\nlisted as the side it is attached to. If a device is attached via a Wired\nModem, then it'll be reported according to its name on the wired network.\nReturns\n{ string... } A list of the names of all attached peripherals.",
      },
      {
        name: "isPresent",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          'Determines if a peripheral is present with the given name.\nParameters\nname string The side or network name that you want to check.\nReturns\nboolean If a peripheral is present with the given name.\nUsage\nperipheral.isPresent("top")peripheral.isPresent("monitor_0")',
      },
      {
        name: "getType",
        args: [{ arg_name: "peripheral", required: true }],
        type: "function",
        description:
          'Get the types of a named or wrapped peripheral.\nParameters\nperipheral string | table The name of the peripheral to find, or a\nwrapped peripheral instance.\nReturns\nstring... The peripheral\'s types, or nil if it is not present.\nUsage\nGet the type of a peripheral above this computer.\nperipheral.getType("top")',
      },
      {
        name: "hasType",
        args: [
          { arg_name: "peripheral", required: true },
          { arg_name: "peripheraltype", required: true },
        ],
        type: "function",
        description:
          "Check if a peripheral is of a particular type.\nParameters\nperipheral string | table The name of the peripheral or a wrapped peripheral instance.peripheral_type string The type to check.\nReturns\nboolean | nil If a peripheral has a particular type, or nil if it is not present.",
      },
      {
        name: "getMethods",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Get all available methods for the peripheral with the given name.\nParameters\nname string The name of the peripheral to find.\nReturns\n{ string... } | nil A list of methods provided by this peripheral, or nil if\nit is not present.",
      },
      {
        name: "getName",
        args: [{ arg_name: "peripheral", required: true }],
        type: "function",
        description:
          "Get the name of a peripheral wrapped with peripheral.wrap.\nParameters\nperipheral table The peripheral to get the name of.\nReturns\nstring The name of the given peripheral.",
      },
      {
        name: "call",
        args: [
          { arg_name: "name", required: true },
          { arg_name: "method", required: true },
          { arg_name: "...args", required: false },
        ],
        type: "function",
        description:
          'Call a method on the peripheral with the given name.\nParameters\nname string The name of the peripheral to invoke the method on.method string The name of the method...  Additional arguments to pass to the method\nReturns\n The return values of the peripheral method.\nUsage\nOpen the modem on the top of this computer.\nperipheral.call("top", "open", 1)',
      },
      {
        name: "wrap",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          'Get a table containing all functions available on a peripheral. These can\nthen be called instead of using peripheral.call every time.\nParameters\nname string The name of the peripheral to wrap.\nReturns\ntable | nil The table containing the peripheral\'s methods, or nil if\nthere is no peripheral present with the given name.\nUsage\nOpen the modem on the top of this computer.\nlocal modem = peripheral.wrap("top")\nmodem.open(1)',
      },
      {
        name: "find",
        args: [
          { arg_name: "ty", required: false },
          { arg_name: "filter", required: false },
        ],
        type: "function",
        description:
          'Find all peripherals of a specific type, and return the\nwrapped peripherals.\nParameters\nty string The type of peripheral to look for.filter? function(name: string, wrapped: table):boolean A\nfilter function, which takes the peripheral\'s name and wrapped table\nand returns if it should be included in the result.\nReturns\ntable... 0 or more wrapped peripherals matching the given filters.\nUsage\nFind all monitors and store them in a table, writing "Hello" on each one.\nlocal monitors = { peripheral.find("monitor") }\nfor _, monitor in pairs(monitors) do\n  monitor.write("Hello")\nendFind all wireless modems connected to this computer.\nlocal modems = { peripheral.find("modem", function(name, modem)\n    return modem.isWireless() -- Check this modem is wireless.\nend) }This abuses the filter argument to call rednet.open on every modem.\nperipheral.find("modem", rednet.open)',
      },
    ],
  },
  {
    name: "peripheral/monitor",
    help_url: "https://tweaked.cc/peripheral/monitor.html#v:",
    list_docs: [
      {
        name: "setTextScale",
        args: [{ arg_name: "scale", required: true }],
        type: "function",
        description:
          "Set the scale of this monitor. A larger scale will result in the monitor having a lower resolution, but display\ntext much larger.\nParameters\nscale number The monitor's scale. This must be a multiple of 0.5 between 0.5 and 5.\nThrows\nIf the scale is out of range.\nSee also\ngetTextScale ",
      },
      {
        name: "getTextScale",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the monitor's current text scale.\nReturns\nnumber The monitor's current scale.\nThrows\nIf the monitor cannot be found.",
      },
      {
        name: "write",
        args: [{ arg_name: "text", required: true }],
        type: "function",
        description:
          "Write text at the current cursor position, moving the cursor to the end of the text.\nUnlike functions like write and print, this does not wrap the text - it simply copies the\ntext to the current terminal line.\nParameters\ntext string The text to write.",
      },
      {
        name: "scroll",
        args: [{ arg_name: "y", required: true }],
        type: "function",
        description:
          "Move all positions up (or down) by y pixels.\nEvery pixel in the terminal will be replaced by the line y pixels below it. If y is negative, it\nwill copy pixels from above instead.\nParameters\ny number The number of lines to move up by. This may be a negative number.",
      },
      {
        name: "getCursorPos",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the position of the cursor.\nReturns\nnumber The x position of the cursor.number The y position of the cursor.",
      },
      {
        name: "setCursorPos",
        args: [
          { arg_name: "x", required: true },
          { arg_name: "y", required: true },
        ],
        type: "function",
        description:
          "Set the position of the cursor. terminal writes will begin from this position.\nParameters\nx number The new x position of the cursor.y number The new y position of the cursor.",
      },
      {
        name: "getCursorBlink",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Checks if the cursor is currently blinking.\nReturns\nboolean If the cursor is blinking.",
      },
      {
        name: "setCursorBlink",
        args: [{ arg_name: "blink", required: true }],
        type: "function",
        description:
          "Sets whether the cursor should be visible (and blinking) at the current cursor position.\nParameters\nblink boolean Whether the cursor should blink.",
      },
      {
        name: "getSize",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the size of the terminal.\nReturns\nnumber The terminal's width.number The terminal's height.",
      },
      {
        name: "clear",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Clears the terminal, filling it with the current background colour.",
      },
      {
        name: "clearLine",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Clears the line the cursor is currently on, filling it with the current background\ncolour.",
      },
      {
        name: "getTextColour",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Return the colour that new text will be written as.\nReturns\nnumber The current text colour.\nSee also\ncolors For a list of colour constants, returned by this function.",
      },
      {
        name: "getTextColor",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Return the colour that new text will be written as.\nReturns\nnumber The current text colour.\nSee also\ncolors For a list of colour constants, returned by this function.",
      },
      {
        name: "setTextColour",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Set the colour that new text will be written as.\nParameters\ncolour number The new text colour.\nSee also\ncolors For a list of colour constants.",
      },
      {
        name: "setTextColor",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Set the colour that new text will be written as.\nParameters\ncolour number The new text colour.\nSee also\ncolors For a list of colour constants.",
      },
      {
        name: "getBackgroundColour",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Return the current background colour. This is used when writing text and clearing\nthe terminal.\nReturns\nnumber The current background colour.\nSee also\ncolors For a list of colour constants, returned by this function.",
      },
      {
        name: "getBackgroundColor",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Return the current background colour. This is used when writing text and clearing\nthe terminal.\nReturns\nnumber The current background colour.\nSee also\ncolors For a list of colour constants, returned by this function.",
      },
      {
        name: "setBackgroundColour",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Set the current background colour. This is used when writing text and clearing the\nterminal.\nParameters\ncolour number The new background colour.\nSee also\ncolors For a list of colour constants.",
      },
      {
        name: "setBackgroundColor",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Set the current background colour. This is used when writing text and clearing the\nterminal.\nParameters\ncolour number The new background colour.\nSee also\ncolors For a list of colour constants.",
      },
      {
        name: "isColour",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Determine if this terminal supports colour.\nTerminals which do not support colour will still allow writing coloured text/backgrounds, but it will be\ndisplayed in greyscale.\nReturns\nboolean Whether this terminal supports colour.",
      },
      {
        name: "isColor",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Determine if this terminal supports colour.\nTerminals which do not support colour will still allow writing coloured text/backgrounds, but it will be\ndisplayed in greyscale.\nReturns\nboolean Whether this terminal supports colour.",
      },
      {
        name: "blit",
        args: [
          { arg_name: "text", required: true },
          { arg_name: "textColour", required: true },
          { arg_name: "backgroundColour", required: true },
        ],
        type: "function",
        description:
          'Writes text to the terminal with the specific foreground and background colours.\nAs with write, the text will be written at the current cursor location, with the cursor\nmoving to the end of the text.\ntextColour and backgroundColour must both be strings the same length as text. All\ncharacters represent a single hexadecimal digit, which is converted to one of CC\'s colours. For instance,\n"a" corresponds to purple.\nParameters\ntext string The text to write.textColour string The corresponding text colours.backgroundColour string The corresponding background colours.\nThrows\nIf the three inputs are not the same length.\nUsage\nPrints "Hello, world!" in rainbow text.\nterm.blit("Hello, world!","01234456789ab","0000000000000")\nSee also\ncolors For a list of colour constants, and their hexadecimal values.',
      },
      {
        name: "setPaletteColour",
        args: [{ arg_name: "...args", required: false }],
        type: "function",
        description:
          'Set the palette for a specific colour.\nComputerCraft\'s palette system allows you to change how a specific colour should be displayed. For instance, you\ncan make colors.red more red by setting its palette to #FF0000. This does now allow you to draw more\ncolours - you are still limited to 16 on the screen at one time - but you can change which colours are\nused.\nParameters\nindex number The colour whose palette should be changed.colour number A 24-bit integer representing the RGB value of the colour. For instance the integer\n0xFF0000 corresponds to the colour #FF0000.\nOr\nindex number The colour whose palette should be changed.r number The intensity of the red channel, between 0 and 1.g number The intensity of the green channel, between 0 and 1.b number The intensity of the blue channel, between 0 and 1.\nUsage\nChange the red colour from the default #CC4C4C to #FF0000.\nterm.setPaletteColour(colors.red, 0xFF0000)\nterm.setTextColour(colors.red)\nprint("Hello, world!")As above, but specifying each colour channel separately.\nterm.setPaletteColour(colors.red, 1, 0, 0)\nterm.setTextColour(colors.red)\nprint("Hello, world!")\nSee also\ncolors.unpackRGB To convert from the 24-bit format to three separate channels.colors.packRGB To convert from three separate channels to the 24-bit format.',
      },
      {
        name: "setPaletteColor",
        args: [{ arg_name: "...args", required: false }],
        type: "function",
        description:
          'Set the palette for a specific colour.\nComputerCraft\'s palette system allows you to change how a specific colour should be displayed. For instance, you\ncan make colors.red more red by setting its palette to #FF0000. This does now allow you to draw more\ncolours - you are still limited to 16 on the screen at one time - but you can change which colours are\nused.\nParameters\nindex number The colour whose palette should be changed.colour number A 24-bit integer representing the RGB value of the colour. For instance the integer\n0xFF0000 corresponds to the colour #FF0000.\nOr\nindex number The colour whose palette should be changed.r number The intensity of the red channel, between 0 and 1.g number The intensity of the green channel, between 0 and 1.b number The intensity of the blue channel, between 0 and 1.\nUsage\nChange the red colour from the default #CC4C4C to #FF0000.\nterm.setPaletteColour(colors.red, 0xFF0000)\nterm.setTextColour(colors.red)\nprint("Hello, world!")As above, but specifying each colour channel separately.\nterm.setPaletteColour(colors.red, 1, 0, 0)\nterm.setTextColour(colors.red)\nprint("Hello, world!")\nSee also\ncolors.unpackRGB To convert from the 24-bit format to three separate channels.colors.packRGB To convert from three separate channels to the 24-bit format.',
      },
      {
        name: "getPaletteColour",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Get the current palette for a specific colour.\nParameters\ncolour number The colour whose palette should be fetched.\nReturns\nnumber The red channel, will be between 0 and 1.number The green channel, will be between 0 and 1.number The blue channel, will be between 0 and 1.",
      },
      {
        name: "getPaletteColor",
        args: [{ arg_name: "colour", required: true }],
        type: "function",
        description:
          "Get the current palette for a specific colour.\nParameters\ncolour number The colour whose palette should be fetched.\nReturns\nnumber The red channel, will be between 0 and 1.number The green channel, will be between 0 and 1.number The blue channel, will be between 0 and 1.",
      },
    ],
  },
  {
    name: "peripheral/computer",
    help_url: "https://tweaked.cc/peripheral/computer.html#v:",
    list_docs: [
      {
        name: "turnOn",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Turn the other computer on.",
      },
      {
        name: "shutdown",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Shutdown the other computer.",
      },
      {
        name: "reboot",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Reboot or turn on the other computer.",
      },
      {
        name: "getID",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the other computer's ID.\nReturns\nnumber The computer's ID.\nSee also\nos.getComputerID To get your computer's ID.",
      },
      {
        name: "isOn",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Determine if the other computer is on.\nReturns\nboolean If the computer is on.",
      },
      {
        name: "getLabel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the other computer's label.\nReturns\nstring | nil The computer's label.\nSee also\nos.getComputerLabel To get your label.",
      },
    ],
  },
  {
    name: "peripheral/modem",
    help_url: "https://tweaked.cc/peripheral/modem.html#v:",
    list_docs: [
      {
        name: "open",
        args: [{ arg_name: "channel", required: true }],
        type: "function",
        description:
          "Open a channel on a modem. A channel must be open in order to receive messages. Modems can have up to 128\nchannels open at one time.\nParameters\nchannel number The channel to open. This must be a number between 0 and 65535.\nThrows\nIf the channel is out of range.\nIf there are too many open channels.",
      },
      {
        name: "isOpen",
        args: [{ arg_name: "channel", required: true }],
        type: "function",
        description:
          "Check if a channel is open.\nParameters\nchannel number The channel to check.\nReturns\nboolean Whether the channel is open.\nThrows\nIf the channel is out of range.",
      },
      {
        name: "close",
        args: [{ arg_name: "channel", required: true }],
        type: "function",
        description:
          "Close an open channel, meaning it will no longer receive messages.\nParameters\nchannel number The channel to close.\nThrows\nIf the channel is out of range.",
      },
      {
        name: "closeAll",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Close all open channels.",
      },
      {
        name: "transmit",
        args: [
          { arg_name: "channel", required: true },
          { arg_name: "replyChannel", required: true },
          { arg_name: "payload", required: true },
        ],
        type: "function",
        description:
          'Sends a modem message on a certain channel. Modems listening on the channel will queue a modem_message\nevent on adjacent computers.\n\ud83d\udec8 noteThe channel does not need be open to send a message.\nParameters\nchannel number The channel to send messages on.replyChannel number The channel that responses to this message should be sent on. This can be the same as\nchannel or entirely different. The channel must have been opened on\nthe sending computer in order to receive the replies.payload any The object to send. This can be any primitive type (boolean, number, string) as well as\ntables. Other types (like functions), as well as metatables, will not be transmitted.\nThrows\nIf the channel is out of range.\nUsage\nWrap a modem and a message on channel 15, requesting a response on channel 43.\nlocal modem = peripheral.find("modem") or error("No modem attached", 0)\nmodem.transmit(15, 43, "Hello, world!")',
      },
      {
        name: "isWireless",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Determine if this is a wired or wireless modem.\nSome methods (namely those dealing with wired networks and remote peripherals) are only available on wired\nmodems.\nReturns\nboolean true if this is a wireless modem.",
      },
      {
        name: "getNamesRemote",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "List all remote peripherals on the wired network.\nIf this computer is attached to the network, it will not be included in\nthis list.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nReturns\n{ string... } Remote peripheral names on the network.",
      },
      {
        name: "isPresentRemote",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Determine if a peripheral is available on this wired network.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nParameters\nname string The peripheral's name.\nReturns\nboolean boolean If a peripheral is present with the given name.\nSee also\nperipheral.isPresent ",
      },
      {
        name: "getTypeRemote",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Get the type of a peripheral is available on this wired network.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nParameters\nname string The peripheral's name.\nReturns\nstring | nil The peripheral's type, or nil if it is not present.\nSee also\nperipheral.getType ",
      },
      {
        name: "hasTypeRemote",
        args: [
          { arg_name: "name", required: true },
          { arg_name: "type", required: true },
        ],
        type: "function",
        description:
          "Check a peripheral is of a particular type.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nParameters\nname string The peripheral's name.type string The type to check.\nReturns\nboolean | nil If a peripheral has a particular type, or nil if it is not present.\nSee also\nperipheral.getType ",
      },
      {
        name: "getMethodsRemote",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Get all available methods for the remote peripheral with the given name.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nParameters\nname string The peripheral's name.\nReturns\n{ string... } | nil A list of methods provided by this peripheral, or nil if it is not present.\nSee also\nperipheral.getMethods ",
      },
      {
        name: "callRemote",
        args: [
          { arg_name: "remoteName", required: true },
          { arg_name: "method", required: true },
          { arg_name: "...args", required: false },
        ],
        type: "function",
        description:
          "Call a method on a peripheral on this wired network.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nParameters\nremoteName string The name of the peripheral to invoke the method on.method string The name of the method...  Additional arguments to pass to the method\nReturns\nstring The return values of the peripheral method.\nSee also\nperipheral.call ",
      },
      {
        name: "getNameLocal",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the network name of the current computer, if the modem is on. This\nmay be used by other computers on the network to wrap this computer as a\nperipheral.\n\ud83d\udec8 noteThis function only appears on wired modems. Check isWireless returns false before calling it.\nReturns\nstring | nil The current computer's name on the wired network.",
      },
    ],
  },
  {
    name: "peripheral/printer",
    help_url: "https://tweaked.cc/peripheral/printer.html#v:",
    list_docs: [
      {
        name: "write",
        args: [{ arg_name: "text", required: true }],
        type: "function",
        description:
          "Writes text to the current page.\nParameters\ntext string The value to write to the page.\nThrows\nIf any values couldn't be converted to a string, or if no page is started.",
      },
      {
        name: "getCursorPos",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the current position of the cursor on the page.\nReturns\nnumber The X position of the cursor.number The Y position of the cursor.\nThrows\nIf a page isn't being printed.",
      },
      {
        name: "setCursorPos",
        args: [
          { arg_name: "x", required: true },
          { arg_name: "y", required: true },
        ],
        type: "function",
        description:
          "Sets the position of the cursor on the page.\nParameters\nx number The X coordinate to set the cursor at.y number The Y coordinate to set the cursor at.\nThrows\nIf a page isn't being printed.",
      },
      {
        name: "getPageSize",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the size of the current page.\nReturns\nnumber The width of the page.number The height of the page.\nThrows\nIf a page isn't being printed.",
      },
      {
        name: "newPage",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Starts printing a new page.\nReturns\nboolean Whether a new page could be started.",
      },
      {
        name: "endPage",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Finalizes printing of the current page and outputs it to the tray.\nReturns\nboolean Whether the page could be successfully finished.\nThrows\nIf a page isn't being printed.",
      },
      {
        name: "setPageTitle",
        args: [{ arg_name: "title", required: false }],
        type: "function",
        description:
          "Sets the title of the current page.\nParameters\ntitle? string The title to set for the page.\nThrows\nIf a page isn't being printed.",
      },
      {
        name: "getInkLevel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the amount of ink left in the printer.\nReturns\nnumber The amount of ink available to print with.",
      },
      {
        name: "getPaperLevel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the amount of paper left in the printer.\nReturns\nnumber The amount of paper available to print with.",
      },
    ],
  },
  {
    name: "peripheral/speaker",
    help_url: "https://tweaked.cc/peripheral/speaker.html#v:",
    list_docs: [
      {
        name: "playNote",
        args: [
          { arg_name: "instrument", required: false },
          { arg_name: "volume", required: false },
          { arg_name: "pitch", required: false },
        ],
        type: "function",
        description:
          'Plays a note block note through the speaker.\nThis takes the name of a note to play, as well as optionally the volume\nand pitch to play the note at.\nThe pitch argument uses semitones as the unit. This directly maps to the\nnumber of clicks on a note block. For reference, 0, 12, and 24 map to F#,\nand 6 and 18 map to C.\nA maximum of 8 notes can be played in a single tick. If this limit is hit, this function will return\nfalse.\nValid instruments\nThe speaker supports all of Minecraft\'s noteblock instruments.\nThese are:\n"harp", "basedrum", "snare", "hat", "bass", "flute",\n"bell", "guitar", "chime", "xylophone", "iron_xylophone",\n"cow_bell", "didgeridoo", "bit", "banjo" and "pling".\nParameters\ninstrument string The instrument to use to play this note.volume? number The volume to play the note at, from 0.0 to 3.0. Defaults to 1.0.pitch? number The pitch to play the note at in semitones, from 0 to 24. Defaults to 12.\nReturns\nboolean Whether the note could be played as the limit was reached.\nThrows\nIf the instrument doesn\'t exist.',
      },
      {
        name: "playSound",
        args: [
          { arg_name: "name", required: false },
          { arg_name: "volume", required: false },
          { arg_name: "pitch", required: false },
        ],
        type: "function",
        description:
          'Plays a Minecraft sound through the speaker.\nThis takes the name of a Minecraft sound, such as\n"minecraft:block.note_block.harp", as well as an optional volume and pitch.\nOnly one sound can be played at once. This function will return false if another sound was started\nthis tick, or if some audio is still playing.\nParameters\nname string The name of the sound to play.volume? number The volume to play the sound at, from 0.0 to 3.0. Defaults to 1.0.pitch? number The speed to play the sound at, from 0.5 to 2.0. Defaults to 1.0.\nReturns\nboolean Whether the sound could be played.\nThrows\nIf the sound name was invalid.\nUsage\nPlay a creeper hiss with the speaker.\nlocal speaker = peripheral.find("speaker")\nspeaker.playSound("entity.creeper.primed")',
      },
      {
        name: "playAudio",
        args: [
          { arg_name: "audio", required: false },
          { arg_name: "volume", required: false },
        ],
        type: "function",
        description:
          'Attempt to stream some audio data to the speaker.\nThis accepts a list of audio samples as amplitudes between -128 and 127. These are stored in an internal buffer\nand played back at 48kHz. If this buffer is full, this function will return false. You should wait for\na speaker_audio_empty event before trying again.\n\ud83d\udec8 noteThe speaker only buffers a single call to playAudio at once. This means if you try to play a small\nnumber of samples, you\'ll have a lot of stutter. You should try to play as many samples in one call as possible\n(up to 128\u00d71024), as this reduces the chances of audio stuttering or halting, especially when the server or\ncomputer is lagging.\nPlaying audio with speakers provides a more complete guide to using speakers\nParameters\naudio { number... } A list of amplitudes.volume? number The volume to play this audio at. If not given, defaults to the previous volume\ngiven to playAudio.\nReturns\nboolean If there was room to accept this audio data.\nThrows\nIf the audio data is malformed.\nUsage\nRead an audio file, decode it using cc.audio.dfpwm, and play it using the speaker.\nlocal dfpwm = require("cc.audio.dfpwm")\nlocal speaker = peripheral.find("speaker")\nlocal decoder = dfpwm.make_decoder()\nfor chunk in io.lines("data/example.dfpwm", 16 * 1024) do\n    local buffer = decoder(chunk)\n    while not speaker.playAudio(buffer) do\n        os.pullEvent("speaker_audio_empty")\n    end\nend\nSee also\ncc.audio.dfpwm Provides utilities for decoding DFPWM audio files into a format which can be played by\nthe speaker.Playing audio with speakers For a more complete introduction to the playAudio function.',
      },
      {
        name: "stop",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Stop all audio being played by this speaker.\nThis clears any audio that playAudio had queued and stops the latest sound played by playSound.",
      },
    ],
  },
  {
    name: "peripheral/command",
    help_url: "https://tweaked.cc/peripheral/command.html#v:",
    list_docs: [
      {
        name: "getCommand",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Get the command this command block will run.\nReturns\nstring The current command.",
      },
      {
        name: "setCommand",
        args: [{ arg_name: "command", required: true }],
        type: "function",
        description:
          "Set the command block's command.\nParameters\ncommand string The new command.",
      },
      {
        name: "runCommand",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Execute the command block once.\nReturns\nboolean If the command completed successfully.string | nil A failure message.",
      },
    ],
  },
  {
    name: "peripheral/drive",
    help_url: "https://tweaked.cc/peripheral/drive.html#v:",
    list_docs: [
      {
        name: "isDiskPresent",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns whether a disk is currently inserted in the drive.\nReturns\nboolean Whether a disk is currently inserted in the drive.",
      },
      {
        name: "getDiskLabel",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the label of the disk in the drive if available.\nReturns\nstring | nil The label of the disk, or nil if either no disk is inserted or the disk doesn't have a label.",
      },
      {
        name: "setDiskLabel",
        args: [{ arg_name: "label", required: false }],
        type: "function",
        description:
          "Sets or clears the label for a disk.\nIf no label or nil is passed, the label will be cleared.\nIf the inserted disk's label can't be changed (for example, a record),\nan error will be thrown.\nParameters\nlabel? string The new label of the disk, or nil to clear.\nThrows\nIf the disk's label can't be changed.",
      },
      {
        name: "hasData",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns whether a disk with data is inserted.\nReturns\nboolean Whether a disk with data is inserted.",
      },
      {
        name: "getMountPath",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the mount path for the inserted disk.\nReturns\nstring | nil The mount path for the disk, or nil if no data disk is inserted.",
      },
      {
        name: "hasAudio",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns whether a disk with audio is inserted.\nReturns\nboolean Whether a disk with audio is inserted.",
      },
      {
        name: "getAudioTitle",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the title of the inserted audio disk.\nReturns\nstring | nil | false The title of the audio, false if no disk is inserted, or nil if the disk has no audio.",
      },
      {
        name: "playAudio",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Plays the audio in the inserted disk, if available.",
      },
      {
        name: "stopAudio",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Stops any audio that may be playing.\nSee also\nplayAudio ",
      },
      {
        name: "ejectDisk",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description: "Ejects any disk that may be in the drive.",
      },
      {
        name: "getDiskID",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          "Returns the ID of the disk inserted in the drive.\nReturns\nnumber | nil The ID of the disk in the drive, or nil if no disk with an ID is inserted.",
      },
    ],
  },
  {
    name: "disk",
    help_url: "https://tweaked.cc/module/disk.html#v:",
    list_docs: [
      {
        name: "isPresent",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          'Checks whether any item at all is in the disk drive\nParameters\nname string The name of the disk drive.\nReturns\nboolean If something is in the disk drive.\nUsage\ndisk.isPresent("top")',
      },
      {
        name: "getLabel",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Get the label of the floppy disk, record, or other media within the given\ndisk drive.\nIf there is a computer or turtle within the drive, this will set the label as\nread by os.getComputerLabel.\nParameters\nname string The name of the disk drive.\nReturns\nstring | nil The name of the current media, or nil if the drive is\nnot present or empty.\nSee also\ndisk.setLabel ",
      },
      {
        name: "setLabel",
        args: [
          { arg_name: "name", required: true },
          { arg_name: "label", required: true },
        ],
        type: "function",
        description:
          "Set the label of the floppy disk or other media\nParameters\nname string The name of the disk drive.label string | nil The new label of the disk",
      },
      {
        name: "hasData",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Check whether the current disk provides a mount.\nThis will return true for disks and computers, but not records.\nParameters\nname string The name of the disk drive.\nReturns\nboolean If the disk is present and provides a mount.\nSee also\ndisk.getMountPath ",
      },
      {
        name: "getMountPath",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Find the directory name on the local computer where the contents of the\ncurrent floppy disk (or other mount) can be found.\nParameters\nname string The name of the disk drive.\nReturns\nstring | nil The mount's directory, or nil if the drive does not\ncontain a floppy or computer.\nSee also\ndisk.hasData ",
      },
      {
        name: "hasAudio",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Whether the current disk is a music disk as opposed to a floppy disk\nor other item.\nIf this returns true, you will can play the record.\nParameters\nname string The name of the disk drive.\nReturns\nboolean If the disk is present and has audio saved on it.",
      },
      {
        name: "getAudioTitle",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Get the title of the audio track from the music record in the drive.\nThis generally returns the same as disk.getLabel for records.\nParameters\nname string The name of the disk drive.\nReturns\nstring | false | nil The track title, false if there is not a music\nrecord in the drive or nil if no drive is present.",
      },
      {
        name: "playAudio",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          'Starts playing the music record in the drive.\nIf any record is already playing on any disk drive, it stops before the\ntarget drive starts playing. The record stops when it reaches the end of the\ntrack, when it is removed from the drive, when disk.stopAudio is called, or\nwhen another record is started.\nParameters\nname string The name of the disk drive.\nUsage\ndisk.playAudio("bottom")',
      },
      {
        name: "stopAudio",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Stops the music record in the drive from playing, if it was started with\ndisk.playAudio.\nParameters\nname string The name o the disk drive.",
      },
      {
        name: "eject",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          'Ejects any item currently in the drive, spilling it into the world as a loose item.\nParameters\nname string The name of the disk drive.\nUsage\ndisk.eject("bottom")',
      },
      {
        name: "getID",
        args: [{ arg_name: "name", required: true }],
        type: "function",
        description:
          "Returns a number which uniquely identifies the disk in the drive.\nNote, unlike disk.getLabel, this does not return anything for other media,\nsuch as computers or turtles.\nParameters\nname string The name of the disk drive.\nReturns\nstring | nil The disk ID, or nil if the drive does not contain a floppy disk.",
      },
    ],
  },
  {
    name: "fs",
    help_url: "https://tweaked.cc/module/fs.html#v:",
    list_docs: [
      {
        name: "complete",
        args: [{ arg_name: "...args", required: false }],
        type: "function",
        description:
          'Provides completion for a file or directory name, suitable for use with\n_G.read.\nWhen a directory is a possible candidate for completion, two entries are\nincluded - one with a trailing slash (indicating that entries within this\ndirectory exist) and one without it (meaning this entry is an immediate\ncompletion candidate). include_dirs can be set to false to only include\nthose with a trailing slash.\nParameters\npath string The path to complete.location string The location where paths are resolved from.include_files? boolean = true When false, only directories will\nbe included in the returned list.include_dirs? boolean = true When false, "raw" directories will\nnot be included in the returned list.\nOr\npath string The path to complete.location string The location where paths are resolved from.options { include_dirs? = boolean, include_files? = boolean, include_hidden? = boolean } This table form is an expanded version of the previous syntax. The\ninclude_files and include_dirs arguments from above are passed in as fields.\nThis table also accepts the following options:\ninclude_hidden: Whether to include hidden files (those starting with .)\nby default. They will still be shown when typing a ..\nReturns\n{ string... } A list of possible completion candidates.\nUsage\nComplete files in the root directory.\nread(nil, nil, function(str)\n    return fs.complete(str, "", true, false)\nend)Complete files in the root directory, hiding hidden files by default.\nread(nil, nil, function(str)\n    return fs.complete(str, "", {\n        include_files = true,\n        include_dirs = false,\n        include_hidden = false,\n    })\nend)',
      },
      {
        name: "find",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Searches for files matching a string with wildcards.\nThis string looks like a normal path string, but can include wildcards, which\ncan match multiple paths:\n"?" matches any single character in a file name.\n"*" matches any number of characters.\nFor example, rom/*/command* will look for any path starting with command\ninside any subdirectory of /rom.\nNote that these wildcards match a single segment of the path. For instance\nrom/*.lua will include rom/startup.lua but not include rom/programs/list.lua.\nParameters\npath string The wildcard-qualified path to search for.\nReturns\n{ string... } A list of paths that match the search string.\nThrows\nIf the supplied path was invalid.\nUsage\nList all Markdown files in the help folder\nfs.find("rom/help/*.md")',
      },
      {
        name: "isDriveRoot",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns true if a path is mounted to the parent filesystem.\nThe root filesystem "/" is considered a mount, along with disk folders and\nthe rom folder. Other programs (such as network shares) can exstend this to\nmake other mount types by correctly assigning their return value for getDrive.\nParameters\npath string The path to check.\nReturns\nboolean If the path is mounted, rather than a normal file/folder.\nThrows\nIf the path does not exist.\nSee also\ngetDrive ',
      },
      {
        name: "list",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns a list of files in a directory.\nParameters\npath string The path to list.\nReturns\n{ string... } A table with a list of files in the directory.\nThrows\nIf the path doesn\'t exist.\nUsage\nList all files under /rom/\nlocal files = fs.list("/rom/")\nfor i = 1, #files do\n  print(files[i])\nend',
      },
      {
        name: "combine",
        args: [
          { arg_name: "path", required: true },
          { arg_name: "...args", required: false },
        ],
        type: "function",
        description:
          'Combines several parts of a path into one full path, adding separators as\nneeded.\nParameters\npath string The first part of the path. For example, a parent directory path.... string Additional parts of the path to combine.\nReturns\nstring The new path, with separators added between parts as needed.\nThrows\nOn argument errors.\nUsage\nCombine several file paths together\nfs.combine("/rom/programs", "../apis", "parallel.lua")\n-- => rom/apis/parallel.lua',
      },
      {
        name: "getName",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns the file name portion of a path.\nParameters\npath string The path to get the name from.\nReturns\nstring The final part of the path (the file name).\nUsage\nGet the file name of rom/startup.lua\nfs.getName("rom/startup.lua")\n-- => startup.lua',
      },
      {
        name: "getDir",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns the parent directory portion of a path.\nParameters\npath string The path to get the directory from.\nReturns\nstring The path with the final part removed (the parent directory).\nUsage\nGet the directory name of rom/startup.lua\nfs.getDir("rom/startup.lua")\n-- => rom',
      },
      {
        name: "getSize",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Returns the size of the specified file.\nParameters\npath string The file to get the file size of.\nReturns\nnumber The size of the file, in bytes.\nThrows\nIf the path doesn't exist.",
      },
      {
        name: "exists",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Returns whether the specified path exists.\nParameters\npath string The path to check the existence of.\nReturns\nboolean Whether the path exists.",
      },
      {
        name: "isDir",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Returns whether the specified path is a directory.\nParameters\npath string The path to check.\nReturns\nboolean Whether the path is a directory.",
      },
      {
        name: "isReadOnly",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Returns whether a path is read-only.\nParameters\npath string The path to check.\nReturns\nboolean Whether the path cannot be written to.",
      },
      {
        name: "makeDir",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Creates a directory, and any missing parents, at the specified path.\nParameters\npath string The path to the directory to create.\nThrows\nIf the directory couldn't be created.",
      },
      {
        name: "move",
        args: [
          { arg_name: "path", required: true },
          { arg_name: "dest", required: true },
        ],
        type: "function",
        description:
          "Moves a file or directory from one path to another.\nAny parent directories are created as needed.\nParameters\npath string The current file or directory to move from.dest string The destination path for the file or directory.\nThrows\nIf the file or directory couldn't be moved.",
      },
      {
        name: "copy",
        args: [
          { arg_name: "path", required: true },
          { arg_name: "dest", required: true },
        ],
        type: "function",
        description:
          "Copies a file or directory to a new path.\nAny parent directories are created as needed.\nParameters\npath string The file or directory to copy.dest string The path to the destination file or directory.\nThrows\nIf the file or directory couldn't be copied.",
      },
      {
        name: "delete",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Deletes a file or directory.\nIf the path points to a directory, all of the enclosed files and\nsubdirectories are also deleted.\nParameters\npath string The path to the file or directory to delete.\nThrows\nIf the file or directory couldn't be deleted.",
      },
      {
        name: "open",
        args: [
          { arg_name: "path", required: true },
          { arg_name: "mode", required: true },
        ],
        type: "function",
        description:
          'Opens a file for reading or writing at a path.\nThe mode string can be any of the following:\n"r": Read mode\n"w": Write mode\n"a": Append mode\n"r+": Update mode (allows reading and writing), all data is preserved\n"w+": Update mode, all data is erased.\nThe mode may also have a "b" at the end, which opens the file in "binary\nmode". This changes fs.ReadHandle.read and fs.WriteHandle.write\nto read/write single bytes as numbers rather than strings.\nParameters\npath string The path to the file to open.mode string The mode to open the file with.\nReturns\ntable A file handle object for the file.\nOr\nnil If the file does not exist, or cannot be opened.string | nil A message explaining why the file cannot be opened.\nThrows\nIf an invalid mode was specified.\nUsage\nRead the contents of a file.\nlocal file = fs.open("/rom/help/intro.txt", "r")\nlocal contents = file.readAll()\nfile.close()\nprint(contents)Open a file and read all lines into a table. io.lines offers an alternative way to do this.\nlocal file = fs.open("/rom/motd.txt", "r")\nlocal lines = {}\nwhile true do\n  local line = file.readLine()\n  -- If line is nil then we\'ve reached the end of the file and should stop\n  if not line then break end\n  lines[#lines + 1] = line\nend\nfile.close()\nprint(lines[math.random(#lines)]) -- Pick a random line and print it.Open a file and write some text to it. You can run edit out.txt to see the written text.\nlocal file = fs.open("out.txt", "w")\nfile.write("Just testing some code")\nfile.close() -- Remember to call close, otherwise changes may not be written!',
      },
      {
        name: "getDrive",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns the name of the mount that the specified path is located on.\nParameters\npath string The path to get the drive of.\nReturns\nstring | nil The name of the drive that the file is on; e.g. hdd for local files, or rom for ROM files.\nThrows\nIf the path doesn\'t exist.\nUsage\nPrint the drives of a couple of mounts:\nprint("/: " .. fs.getDrive("/"))\nprint("/rom/: " .. fs.getDrive("rom"))',
      },
      {
        name: "getFreeSpace",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns the amount of free space available on the drive the path is\nlocated on.\nParameters\npath string The path to check the free space for.\nReturns\nnumber | "unlimited" The amount of free space available, in bytes, or "unlimited".\nThrows\nIf the path doesn\'t exist.\nSee also\ngetCapacity To get the capacity of this drive.',
      },
      {
        name: "getCapacity",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          'Returns the capacity of the drive the path is located on.\nParameters\npath string The path of the drive to get.\nReturns\nnumber | nil This drive\'s capacity. This will be nil for "read-only" drives, such as the ROM or\ntreasure disks.\nThrows\nIf the capacity cannot be determined.\nSee also\ngetFreeSpace To get the free space available on this drive.',
      },
      {
        name: "attributes",
        args: [{ arg_name: "path", required: true }],
        type: "function",
        description:
          "Get attributes about a specific file or folder.\nThe returned attributes table contains information about the size of the file, whether it is a directory,\nwhen it was created and last modified, and whether it is read only.\nThe creation and modification times are given as the number of milliseconds since the UNIX epoch. This may be\ngiven to os.date in order to convert it to more usable form.\nParameters\npath string The path to get attributes for.\nReturns\n{ size = number, isDir = boolean, isReadOnly = boolean, created = number, modified = number } The resulting attributes.\nThrows\nIf the path does not exist.\nSee also\ngetSize If you only care about the file's size.isDir If you only care whether a path is a directory or not.",
      },
    ],
  },
  {
    name: "redstone",
    help_url: "https://tweaked.cc/module/redstone.html#v:",
    list_docs: [
      {
        name: "getSides",
        args: [{ arg_name: "", required: true }],
        type: "function",
        description:
          'Returns a table containing the six sides of the computer. Namely, "top", "bottom", "left", "right", "front" and\n"back".\nReturns\n{ string... } A table of valid sides.',
      },
      {
        name: "setOutput",
        args: [
          { arg_name: "side", required: true },
          { arg_name: "on", required: true },
        ],
        type: "function",
        description:
          "Turn the redstone signal of a specific side on or off.\nParameters\nside string The side to set.on boolean Whether the redstone signal should be on or off. When on, a signal strength of 15 is emitted.",
      },
      {
        name: "getOutput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the current redstone output of a specific side.\nParameters\nside string The side to get.\nReturns\nboolean Whether the redstone output is on or off.\nSee also\nsetOutput ",
      },
      {
        name: "getInput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the current redstone input of a specific side.\nParameters\nside string The side to get.\nReturns\nboolean Whether the redstone input is on or off.",
      },
      {
        name: "setAnalogOutput",
        args: [
          { arg_name: "side", required: true },
          { arg_name: "value", required: true },
        ],
        type: "function",
        description:
          "Set the redstone signal strength for a specific side.\nParameters\nside string The side to set.value number The signal strength between 0 and 15.\nThrows\nIf value is not between 0 and 15.",
      },
      {
        name: "setAnalogueOutput",
        args: [
          { arg_name: "side", required: true },
          { arg_name: "value", required: true },
        ],
        type: "function",
        description:
          "Set the redstone signal strength for a specific side.\nParameters\nside string The side to set.value number The signal strength between 0 and 15.\nThrows\nIf value is not between 0 and 15.",
      },
      {
        name: "getAnalogOutput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the redstone output signal strength for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The output signal strength, between 0 and 15.\nSee also\nsetAnalogOutput ",
      },
      {
        name: "getAnalogueOutput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the redstone output signal strength for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The output signal strength, between 0 and 15.\nSee also\nsetAnalogOutput ",
      },
      {
        name: "getAnalogInput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the redstone input signal strength for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The input signal strength, between 0 and 15.",
      },
      {
        name: "getAnalogueInput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the redstone input signal strength for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The input signal strength, between 0 and 15.",
      },
      {
        name: "setBundledOutput",
        args: [
          { arg_name: "side", required: true },
          { arg_name: "output", required: true },
        ],
        type: "function",
        description:
          "Set the bundled cable output for a specific side.\nParameters\nside string The side to set.output number The colour bitmask to set.\nSee also\ncolors.subtract For removing a colour from the bitmask.colors.combine For adding a color to the bitmask.",
      },
      {
        name: "getBundledOutput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the bundled cable output for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The bundle cable's output.",
      },
      {
        name: "getBundledInput",
        args: [{ arg_name: "side", required: true }],
        type: "function",
        description:
          "Get the bundled cable input for a specific side.\nParameters\nside string The side to get.\nReturns\nnumber The bundle cable's input.\nSee also\ntestBundledInput To determine if a specific colour is set.",
      },
      {
        name: "testBundledInput",
        args: [
          { arg_name: "side", required: true },
          { arg_name: "mask", required: true },
        ],
        type: "function",
        description:
          'Determine if a specific combination of colours are on for the given side.\nParameters\nside string The side to test.mask number The mask to test.\nReturns\nboolean If the colours are on.\nUsage\nCheck if colors.white and colors.black are on above the computer.\nprint(redstone.testBundledInput("top", colors.combine(colors.white, colors.black)))\nSee also\ngetBundledInput ',
      },
    ],
  },
];
