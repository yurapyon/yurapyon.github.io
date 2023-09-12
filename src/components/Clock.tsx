import React from "react";

const pad = (val: number) => {
    return val.toString().padStart(2, '0');
}

const timeString = (hr: number, min: number, sec: number) => {
    hr %= 12;
    if (hr === 0) {
        hr = 12;
    }
    return `${pad(hr)}:${pad(min)}:${pad(sec)}`

}

export const Clock: React.FC<{}> = ({}) => {
    const [dateString, setDateString] = React.useState("");

    React.useEffect(() => {
        const interval = setInterval(()=>{
            const date = new Date();
            setDateString(timeString(date.getHours(), date.getMinutes(), date.getSeconds()));
        }, 1000)

        return () => clearInterval(interval);
    });

    return (<div>
        {dateString}
    </div>);
};