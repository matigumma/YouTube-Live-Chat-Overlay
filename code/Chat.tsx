import * as React from "react"
import { Frame, Stack, Scroll, addPropertyControls, ControlType } from "framer"
import axios from "axios"

export function Chat(props) {
    //helps clone children
    const { children, ...rest } = props

    const [chatID, setChatId] = React.useState([])
    const [messages, setMessages] = React.useState([])

    const getMessages = async () => {
        try {
            const liveChatId = await axios.get(
                "https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" +
                    props.YoutubeID +
                    "&key=" +
                    props.MyAPIkey
            )

            setChatId(liveChatId.data.items)

            const userPosts = await axios.get(
                "https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=" +
                    liveChatId.data.items[0].liveStreamingDetails
                        .activeLiveChatId +
                    "&part=snippet%2C%20authorDetails&key=" +
                    props.MyAPIkey
            )
            setMessages(userPosts.data.items) // set State
        } catch (err) {
            console.error(err.message)
        }
    }

    React.useEffect(() => {
        //Sharing the AbortController between the fetch() requests is the right approach.
        //When any of the Promises are aborted, Promise.all() will reject with AbortError:
        const ac = new AbortController()

        getMessages()

        const interval = setInterval(() => {
            getMessages()
        }, props.interval)

        return () => clearInterval(interval)
        ac.abort()
    }, [props.MyAPIkey, props.YoutubeID])

    return (
        <Scroll
            height={props.height}
            width={props.width}
            backgroundColor={props.background}
        >
            <Stack
                direction="vertical"
                gap={10}
                alignment="start"
                distribution="start"
                height="auto"
                width={props.width}
                padding={40}
            >
                {messages.map((post) => (
                    <Frame height={props.listItemHeight} background="none">
                        {props.children}
                        {React.cloneElement(children[0], {
                            //Each child in a list should have a unique "key" prop
                            key: post.id,
                            chatMessage: post.snippet.displayMessage,
                            authorName: post.authorDetails.displayName,
                            avatar: post.authorDetails.profileImageUrl,
                        })}
                    </Frame>
                ))}
            </Stack>
        </Scroll>
    )
}

Chat.defaultProps = {
    listItemHeight: 70,
    width: 1920,
    height: 600,
    background: "#0F0F0F",
    MyAPIkey: "",
    YoutubeID: "",
    interval: 5000,
}

addPropertyControls(Chat, {
    YoutubeID: {
        title: "YoutubeID",
        type: ControlType.String,
        defaultValue: "Youtube Live ID",
    },
    MyAPIkey: {
        title: "API",
        type: ControlType.String,
        defaultValue: "Your API key",
    },
    interval: {
        title: "Interval",
        type: ControlType.Number,
        min: 0,
        max: 600000,
        unit: "ms",
        defaultValue: 5000,
    },
    listItemHeight: {
        title: "Msg Height",
        type: ControlType.Number,
        min: 20,
        max: 560,
        unit: "px",
        defaultValue: 104,
    },
})
