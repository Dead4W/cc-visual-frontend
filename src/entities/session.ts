export type SocketData = {
    state: string,
    ide_state: string,
    connected_computers: string[],
    session: null|Session,
};

export type Session = {
    connected_computers: string[],
    web_ide_session_key: null|string;
    cc_session_key: null|string;
    id: null|number;
};