import React from "react";

export function genPrice(prices: any, vsf: boolean, tier: number, exp_ct: number) { 
    return prices.base + (vsf ? prices.vseeface : 0) + prices.tiers[tier] + prices.expressions * exp_ct;
};

const VsfSelector: React.FC<{
    vsf: boolean,
    setVsf: (_:boolean)=>void,
}> = ({vsf, setVsf}) => {
    const on = "bg-lmn-pink hover:bg-lmn-white font-bold";
    const off = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold";
    return (<div
            className={"px-1.5 py-1 h-full cursor-pointer " + (vsf ? on : off)}
            onClick={()=>{setVsf(!vsf);}}
        >
        {vsf ? "with vseeface tracking" : "without vseeface tracking"}
    </div>);
}

const TierSelector: React.FC<{
    tier: number,
    setTier: (_:number)=>void,
}> = ({tier, setTier}) => {
    const on = "bg-lmn-yellow font-bold";
    const off = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold cursor-pointer";
    return (<>
        {[0, 1, 2].map((t)=>{
            return <div
                    className={"px-1.5 py-1 text-center " + (tier === t ? on : off)}
                    onClick={()=>{setTier(t);}}
                >
                tier {t}
            </div>;
        })}
    </>);
}

const ExpressionsCount: React.FC<{
    expressions: number,
    setExpressions: (_:number)=>void,
}> = ({expressions, setExpressions}) => {
    const on = "bg-lmn-green hover:bg-lmn-white font-bold cursor-pointer";
    const off = "bg-lmn-slate text-lmn-white";

    const expReset = () => setExpressions(0);

    const expText = expressions + (expressions === 1 ? " expression" : " expressions");

    return (<div
            className={"group px-1.5 py-1 h-full " + (expressions > 0 ? on : off)}
            onClick={()=>{expReset();}}
        >
        {expressions > 0 ?
        <>
            <div className="inline group-hover:hidden">
                {expText}
            </div>
            <div className="hidden group-hover:inline">
                clear
            </div>
        </>
        : expText }

    </div>);
}

const ExpressionsSelector: React.FC<{
    expressions: number,
    setExpressions: (_:number)=>void,
}> = ({expressions, setExpressions}) => {
    const expMax = 5;

    const btnOk = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold cursor-pointer";
    const btnBad = "bg-lmn-white";

    const expUp = () => setExpressions(Math.min(expressions + 1, expMax));
    const expDown = () => setExpressions(Math.max(expressions - 1, 0));

    return (<div className="flex flex-row">
        <div
            className={"flex-1 px-1.5 py-1 text-center " + (expressions !== expMax ? btnOk : btnBad)}
            onClick={()=>{expUp();}}
        >+</div>
        <div
            className={"flex-1 px-1.5 py-1 text-center " + (expressions > 0 ? btnOk : btnBad)}
            onClick={()=>{expDown();}}
        >-</div>
    </div>);
}

export const Calc: React.FC<{
    prices: any 
}> = ({prices}) => {
    const [vsf, setVsf] = React.useState(true);
    const [tier, setTier] = React.useState(1);
    const [expressions, setExpressions] = React.useState(0);
    const [price, setPrice] = React.useState(genPrice(prices, vsf, tier, expressions));

    React.useEffect(()=>{
        setPrice(genPrice(prices, vsf, tier, expressions));
    }, [vsf, tier, expressions]);

    return (<div className="cursor-default select-none font-mono not-prose">
        <div className="grid grid-cols-3 grid-rows-3 grid-flow-col">
            <div className="row-span-3">
                <VsfSelector vsf={vsf} setVsf={setVsf} />
            </div>
            <TierSelector tier={tier} setTier={setTier} />
            <div className="row-span-2">
                <ExpressionsCount expressions={expressions} setExpressions={setExpressions} />
            </div>
            <ExpressionsSelector expressions={expressions} setExpressions={setExpressions} />
        </div>
        <div className="px-1.5 py-1">
            base price + extras = <span className="font-bold">{price}$</span>&ensp;
            <span className="inline-block">(actual price may be different)</span>
        </div>
    </div>);
}