import React from "react";
import Tmi from "tmi.js";

// images cached by browser
// every user if they type a word with capital letters, load thier emoteset
// cache emote sets by id
// cache user's available emote names per user
// cache emote-images by name

// uesr badges
// user name color

// spinny emotes
// emote effects for subs
// bttv

// rows and columns
// vertical horizontal

type FeedItem = {
    msg_uuid: string;
    emote_url: string;
};

const useEmoteFeed = (emote_ct: number) => {
    const [feed, setFeed] = React.useState([] as FeedItem[]);
    const client = React.useRef(new Tmi.Client({channels:['bitelemons']}));

    React.useEffect(()=>{
        client.current.connect();

        client.current.on('connected', () => {
            console.log("connected");
        })

        client.current.on('message', (channel, tags, message, self) => {
            if (!(tags["message-type"] === "chat" && tags.emotes)) return;

            const arr: any[] = [];
            for (var key in tags.emotes) {
                tags.emotes[key].forEach((placement)=>{
                    const at = parseInt(placement.split('-')[0], 10);
                    arr.push({at, key})
                });
            }
            arr.sort((a, b) => a.at - b.at);
            setFeed((feed) => {
                const newFeed = [...feed,
                    ...arr.map(({key}) => {
                        return {msg_uuid:"", emote_url:key} as FeedItem;
                    })
                ]
                return newFeed.slice(newFeed.length - emote_ct, newFeed.length);
            });
        })

        return () => {
            client.current.disconnect();
        }
    }, [setFeed]);

    return feed;
}

export const Chat: React.FC<{}> = ({}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const feed = useEmoteFeed(Number(urlParams.get('count')) || 8);
    const height = Number(urlParams.get('height')) || 112;

    let sz = "1.0";
    if (height > 56) {
        sz = "3.0";
    } else if (height > 28) {
        sz = "2.0";
    }

    return (<div className={"flex flex-row h-[" + height + "px]"}>
        {feed.map((item, i)=>{
            const url = "https://static-cdn.jtvnw.net/emoticons/v2/" + item.emote_url + "/default/dark/" + sz;
            return <img key={i} className="aspect-square" src={url} />
        })}
    </div>);
};