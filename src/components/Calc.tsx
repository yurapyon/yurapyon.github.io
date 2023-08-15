import React from "react";

export function genPrice(prices: any, vsf: boolean, tier: number, exp_ct: number) { 
    return prices.base + (vsf ? prices.vseeface : 0) + prices.tiers[tier] + prices.expressions * exp_ct;
};

const ChangeTextOnHover: React.FC<{
    onNotHover: string,
    onHover: string,
}> = ({onNotHover, onHover}) => {
    return (<>
        <div className="inline group-hover:hidden">
            {onNotHover}
        </div>
        <div className="hidden group-hover:inline">
            {onHover}
        </div>
    </>);
};

const ExpressionsCount: React.FC<{
    expressions: number,
    setExpressions: (_:number)=>void,
}> = ({expressions, setExpressions}) => {
    const on = "bg-lmn-blue text-lmn-slate hover:bg-lmn-white hover:text-lmn-slate font-bold";
    const off = "";

    const expReset = () => setExpressions(0);

    const expText = expressions + (expressions === 1 ? " expression" : " expressions");

    return (<div className={"group px-1.5 py-1 h-full " + (expressions > 0 ? on : off)} onClick={expReset} >
        {expressions > 0 ? <ChangeTextOnHover onNotHover={expText} onHover="clear" /> : expText }
    </div>);
}

const ExpressionsSelector: React.FC<{
    expressions: number,
    setExpressions: (_:number)=>void,
}> = ({expressions, setExpressions}) => {
    const expMax = 5;

    const btnOk = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold";
    const btnBad = "bg-lmn-white text-lmn-slate hover:bg-lmn-red hover:text-lmn-white hover:font-bold";

    const expUp = () => setExpressions(Math.min(expressions + 1, expMax));
    const expDown = () => setExpressions(Math.max(expressions - 1, 0));

    return (<div className="flex flex-row">
        <div className={"flex-1 px-1.5 py-1 text-center " + (expressions !== expMax ? btnOk : btnBad)} onClick={expUp}>+</div>
        <div className={"flex-1 px-1.5 py-1 text-center " + (expressions > 0 ? btnOk : btnBad)} onClick={expDown}>-</div>
    </div>);
}

const VsfSelector: React.FC<{
    vsf: boolean,
    setVsf: (_:boolean)=>void,
}> = ({vsf, setVsf}) => {
    const on = "bg-lmn-green text-lmn-slate hover:bg-lmn-white font-bold";
    const off = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold";
    return (<div className={"px-1.5 py-1 h-full " + (vsf ? on : off)} onClick={()=>setVsf(!vsf)}>
        {vsf ? "with vseeface tracking" : "without vseeface tracking"}
    </div>);
}

const TierSelector: React.FC<{
    tier: number,
    setTier: (_:number) => void
}> = ({tier, setTier}) => {
    const on = "bg-lmn-yellow text-lmn-slate font-bold";
    const off = "bg-lmn-slate text-lmn-white hover:bg-lmn-blue hover:text-lmn-slate hover:font-bold";
    return (<>
        {[0, 1, 2].map((t)=>{
            return <div
                    className={"px-1.5 py-1 text-center " + (tier === t ? on : off)}
                    onClick={()=>{setTier(t)}}>
                tier {t}
            </div>;
        })}
    </>);
}

const Total: React.FC<{
    totalPrice: number,
    reset: () => void,
    canReset: () => boolean,
}> = ({totalPrice, reset, canReset}) => {
    return (canReset() ?
        <div className="group px-1.5 py-1 bg-lmn-pink text-lmn-slate font-bold hover:bg-lmn-blue" onClick={reset}>
            <ChangeTextOnHover onNotHover={`base price + extras = ${totalPrice}$`} onHover="reset" />
        </div>
        :
        <div className="px-1.5 py-1 bg-lmn-pink text-lmn-slate font-bold" onClick={reset}>
            base price + extras = {totalPrice}$
        </div>
    );
};

export const Calc: React.FC<{
    prices: any 
}> = ({prices}) => {
    const [vsf, setVsf] = React.useState(true);
    const [tier, setTier] = React.useState(1);
    const [expressions, setExpressions] = React.useState(0);
    const [price, setPrice] = React.useState(genPrice(prices, vsf, tier, expressions));
    const [colorCycle, setColorCycle] = React.useState(0);

    const availableColors = [
        "bg-lmn-green",
        "bg-lmn-blue",
        "bg-lmn-yellow",
        "bg-lmn-pink",
    ];

    React.useEffect(()=>{
        setPrice(genPrice(prices, vsf, tier, expressions));
    }, [vsf, tier, expressions]);

    React.useEffect(()=>{
        if (colorCycle < (availableColors.length - 1)) {
            setColorCycle(colorCycle + 1);
        } else {
            setColorCycle(0);
        }
    }, [price]);

    const canReset = () => !(vsf === true && tier === 1 && expressions === 0);

    const reset = () => {
        setVsf(true);
        setTier(1);
        setExpressions(0);
    };

    return (<div className="bg-blue-white-mid cursor-default select-none font-mono not-prose">
        <div className={"px-1.5 py-1 text-center text-lmn-slate font-bold " + availableColors[colorCycle]}>price estimator: actual price may be different</div>
        <div className="grid grid-cols-3 grid-rows-3 grid-flow-col">
            <div className="row-span-3">
                <VsfSelector vsf={vsf} setVsf={setVsf} />
            </div>
            <TierSelector tier={tier} setTier={setTier} />
            <div className="row-span-2">
                <ExpressionsCount expressions={expressions} setExpressions={setExpressions}/>
            </div>
            <ExpressionsSelector expressions={expressions} setExpressions={setExpressions}/>
        </div>
        <Total totalPrice={price} reset={reset} canReset={canReset}/>
    </div>);
}