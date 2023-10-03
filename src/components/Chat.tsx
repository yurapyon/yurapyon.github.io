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

// https://cdn.betterttv.net/emote/64d5d1f47276ef62562ae710/3x.webp

type FeedItem = {
    emote_url: string;
};

type EmoteGroup = {
    msg_uuid: string;
    count: 1 | 2 | 3;
}

//  1: 1
//  2: 1 1
//  3: 1 1 1
//  4: 4
//  5: 1 4
//  6: 1 1 4
//  7: 1 1 1 4
//  8: 4 4
//  9: 1 4 4
// 10: 1 1 4 4

//  1: 1
//  2: 1 1
//  3: 3
//  4: 1 3
//  5: 1 1 3
//  6: 3 3
//  7: 1 3 3
//  8: 1 1 3 3
//  9: 3 3 3
// 10: 1 3 3 3

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
                    const at = parseInt(placement, 10);
                    arr.push({at, key})
                });
            }
            arr.sort((a, b) => a.at - b.at);
            setFeed((feed) => {
                const newFeed = [
                    ...feed,
                    ...arr.map(({key}) => {
                        return {msg_uuid: "", emote_url: key} as FeedItem;
                    }),
                ];
                if (newFeed.length > emote_ct) {
                    return newFeed.slice(newFeed.length - emote_ct, newFeed.length);
                } else {
                    return newFeed;
                }
            });
        })

        return () => {
            client.current.disconnect();
        }
    }, [setFeed, emote_ct]);

    return feed;
}

export const Chat: React.FC<{}> = ({}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const count = Number(urlParams.get('count')) || 8;
    const height = Number(urlParams.get('height')) || 112;
    const feed = useEmoteFeed(count);

    let sz = "1.0";
    if (height > 56) {
        sz = "3.0";
    } else if (height > 28) {
        sz = "2.0";
    }

    return (<div className={"flex flex-row flex-nowrap h-[" + height + "px] w-[" + height * count + "px]"}>
        {feed.map((item, i)=>{
            const url = "https://static-cdn.jtvnw.net/emoticons/v2/" + item.emote_url + "/default/dark/" + sz;
            return <div key={i} className={"aspect-square w-[" + height + "px]"}>
                <img className="" src={url} />
            </div>
        })}
    </div>);
};