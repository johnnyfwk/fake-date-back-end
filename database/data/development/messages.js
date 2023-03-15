const messages = [
    {messageDate: "2023-03-11T01:00:42.783Z", message: "Direct message 1", senderUserId: 1, receiverUserId: 2},
    {messageDate: "2023-03-11T01:00:43.783Z", message: "Direct message 2", senderUserId: 2, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:44.783Z", message: "Direct message 3", senderUserId: 1, receiverUserId: 2},
    {messageDate: "2023-03-11T01:00:45.783Z", message: "Direct message 4", senderUserId: 1, receiverUserId: 2},
    {messageDate: "2023-03-11T01:00:46.783Z", message: "Direct message 5", senderUserId: 2, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:47.783Z", message: "Direct message 6", senderUserId: 2, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:48.783Z", message: "Direct message 7", senderUserId: 1, receiverUserId: 2},
    {messageDate: "2023-03-11T01:00:49.783Z", message: "Direct message 8", senderUserId: 2, receiverUserId: 1},

    {messageDate: "2023-03-11T01:00:50.783Z", message: "Direct message 9", senderUserId: 1, receiverUserId: 3},
    {messageDate: "2023-03-11T01:00:51.783Z", message: "Direct message 10", senderUserId: 3, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:52.783Z", message: "Direct message 11", senderUserId: 1, receiverUserId: 3},
    {messageDate: "2023-03-11T01:00:53.783Z", message: "Direct message 12", senderUserId: 1, receiverUserId: 3},
    {messageDate: "2023-03-11T01:00:54.783Z", message: "Direct message 13", senderUserId: 3, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:55.783Z", message: "Direct message 14", senderUserId: 3, receiverUserId: 1},
    {messageDate: "2023-03-11T01:00:56.783Z", message: "Direct message 15", senderUserId: 1, receiverUserId: 3},
    {messageDate: "2023-03-11T01:00:57.783Z", message: "Direct message 16", senderUserId: 3, receiverUserId: 1},

    {messageDate: "2023-03-11T01:00:58.783Z", message: "Direct message 17", senderUserId: 1, receiverUserId: 4},
    {messageDate: "2023-03-11T01:00:59.783Z", message: "Direct message 18", senderUserId: 4, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:00.783Z", message: "Direct message 19", senderUserId: 1, receiverUserId: 4},
    {messageDate: "2023-03-11T01:01:01.783Z", message: "Direct message 20", senderUserId: 1, receiverUserId: 4},
    {messageDate: "2023-03-11T01:01:02.783Z", message: "Direct message 21", senderUserId: 4, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:03.783Z", message: "Direct message 22", senderUserId: 4, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:04.783Z", message: "Direct message 23", senderUserId: 1, receiverUserId: 4},
    {messageDate: "2023-03-11T01:01:05.783Z", message: "Direct message 24", senderUserId: 4, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:06.783Z", message: "Direct message 25", senderUserId: 1, receiverUserId: 5},
    {messageDate: "2023-03-11T01:01:07.783Z", message: "Direct message 26", senderUserId: 5, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:08.783Z", message: "Direct message 27", senderUserId: 1, receiverUserId: 5},
    {messageDate: "2023-03-11T01:01:09.783Z", message: "Direct message 28", senderUserId: 1, receiverUserId: 5},
    {messageDate: "2023-03-11T01:01:10.783Z", message: "Direct message 29", senderUserId: 5, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:11.783Z", message: "Direct message 30", senderUserId: 5, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:12.783Z", message: "Direct message 31", senderUserId: 1, receiverUserId: 5},
    {messageDate: "2023-03-11T01:01:13.783Z", message: "Direct message 32", senderUserId: 5, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:14.783Z", message: "Direct message 33", senderUserId: 1, receiverUserId: 6},
    {messageDate: "2023-03-11T01:01:15.783Z", message: "Direct message 34", senderUserId: 6, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:16.783Z", message: "Direct message 35", senderUserId: 1, receiverUserId: 6},
    {messageDate: "2023-03-11T01:01:17.783Z", message: "Direct message 36", senderUserId: 1, receiverUserId: 6},
    {messageDate: "2023-03-11T01:01:18.783Z", message: "Direct message 37", senderUserId: 6, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:19.783Z", message: "Direct message 38", senderUserId: 6, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:20.783Z", message: "Direct message 39", senderUserId: 1, receiverUserId: 6},
    {messageDate: "2023-03-11T01:01:21.783Z", message: "Direct message 40", senderUserId: 6, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:22.783Z", message: "Direct message 41", senderUserId: 1, receiverUserId: 7},
    {messageDate: "2023-03-11T01:01:23.783Z", message: "Direct message 42", senderUserId: 7, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:24.783Z", message: "Direct message 43", senderUserId: 1, receiverUserId: 7},
    {messageDate: "2023-03-11T01:01:25.783Z", message: "Direct message 44", senderUserId: 1, receiverUserId: 7},
    {messageDate: "2023-03-11T01:01:26.783Z", message: "Direct message 45", senderUserId: 7, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:27.783Z", message: "Direct message 46", senderUserId: 7, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:28.783Z", message: "Direct message 47", senderUserId: 1, receiverUserId: 7},
    {messageDate: "2023-03-11T01:01:29.783Z", message: "Direct message 48", senderUserId: 7, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:30.783Z", message: "Direct message 49", senderUserId: 1, receiverUserId: 8},
    {messageDate: "2023-03-11T01:01:31.783Z", message: "Direct message 50", senderUserId: 8, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:32.783Z", message: "Direct message 51", senderUserId: 1, receiverUserId: 8},
    {messageDate: "2023-03-11T01:01:33.783Z", message: "Direct message 52", senderUserId: 1, receiverUserId: 8},
    {messageDate: "2023-03-11T01:01:34.783Z", message: "Direct message 53", senderUserId: 8, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:35.783Z", message: "Direct message 54", senderUserId: 8, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:36.783Z", message: "Direct message 55", senderUserId: 1, receiverUserId: 8},
    {messageDate: "2023-03-11T01:01:37.783Z", message: "Direct message 56", senderUserId: 8, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:38.783Z", message: "Direct message 57", senderUserId: 1, receiverUserId: 9},
    {messageDate: "2023-03-11T01:01:39.783Z", message: "Direct message 58", senderUserId: 9, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:40.783Z", message: "Direct message 59", senderUserId: 1, receiverUserId: 9},
    {messageDate: "2023-03-11T01:01:41.783Z", message: "Direct message 60", senderUserId: 1, receiverUserId: 9},
    {messageDate: "2023-03-11T01:01:42.783Z", message: "Direct message 61", senderUserId: 9, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:43.783Z", message: "Direct message 62", senderUserId: 9, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:44.783Z", message: "Direct message 63", senderUserId: 1, receiverUserId: 9},
    {messageDate: "2023-03-11T01:01:45.783Z", message: "Direct message 64", senderUserId: 9, receiverUserId: 1},

    {messageDate: "2023-03-11T01:01:46.783Z", message: "Direct message 65", senderUserId: 1, receiverUserId: 10},
    {messageDate: "2023-03-11T01:01:47.783Z", message: "Direct message 66", senderUserId: 10, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:48.783Z", message: "Direct message 67", senderUserId: 1, receiverUserId: 10},
    {messageDate: "2023-03-11T01:01:49.783Z", message: "Direct message 68", senderUserId: 1, receiverUserId: 10},
    {messageDate: "2023-03-11T01:01:50.783Z", message: "Direct message 69", senderUserId: 10, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:51.783Z", message: "Direct message 70", senderUserId: 10, receiverUserId: 1},
    {messageDate: "2023-03-11T01:01:52.783Z", message: "Direct message 71", senderUserId: 1, receiverUserId: 10},
    {messageDate: "2023-03-11T01:01:53.783Z", message: "Direct message 72", senderUserId: 10, receiverUserId: 1},
];

module.exports = messages;