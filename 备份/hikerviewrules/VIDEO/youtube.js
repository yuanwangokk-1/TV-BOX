const youtube = {
    name: 'YouTube',
    empty: 'hiker://empty',
    d: [],
    plugins: {
        channels: "hiker://files/rules/js/TyrantGenesis_YouTube-Channels.js",
        keyPath: "hiker://files/rules/js/TyrantGenesis_YouTube-api-key.js",
    },
    defaultChannels: [
        {
            title: 'J. Cole',
            channelId: 'UCnc6db-y3IU7CkT_yeVXdVg',
            icon: 'https://yt3.ggpht.com/ytc/AAUvwniDYxWC2x4VZF7ecutGEaLpssNmrptdeuVFJI999g=s88-c-k-c0x00ffffff-no-rj-mo',
        },
        {
            title: 'Lofi Girl',
            channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
            icon: 'https://yt3.ggpht.com/ytc/AAUvwnhGIymQGp3jRMECbTCBSRAUqi8sKbATpWowQG44CA=s88-c-k-c0x00ffffff-no-rj',
        },
        {
            title: 'HatsuneMiku',
            channelId: 'UCJwGWV914kBlV4dKRn7AEFA',
            icon: 'https://yt3.ggpht.com/ytc/AAUvwnjlsiW6yKsmkrfqn2foSm-ONTTWLeK_G70PF6TXBg=s800-c-k-c0x00ffffff-no-rj-mo',
        }
    ],
    defaultKey: 'AIzaSyDAVB60lCVpHO0nnsWyGtDWC9DTxH8vWlg',
    channelSelect: setItem('YouTube.channelSelect', '0'),
    homePageToken: setItem('YouTube.homePageToken', ''),
    pluginsInit: () => {
        const channels = fetch(youtube.plugins.channels)
        const key = fetch(youtube.plugins.keyPath)
        if (!channels) {
            const defaultChannels = youtube.defaultChannels.map(channel => channel.title + '$$$' + channel.channelId + '$$$' + channel.icon).join('\n')
            writeFile(youtube.plugins.channels, defaultChannels)
        }
        if (!key) {
            writeFile(youtube.plugins.keyPath, youtube.defaultKey)
        }
    },
    baseParse: () => {
        setResult(youtube.d)
    },
}

$.exports = youtube
