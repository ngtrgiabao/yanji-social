import React, { useEffect, useRef, useCallback } from "react";

const createWidget = () => {
    if (
        document.getElementById("tradingview_de838") &&
        "TradingView" in window
    ) {
        new window.TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            timezone: "Asia/Ho_Chi_Minh",
            theme: "dark",
            style: "1",
            locale: "vi_VN",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            range: "YTD",
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            container_id: "tradingview_de838",
        });
    }
};

export default function TradingViewWidget() {
    const onLoadScriptRef = useRef();

    const loadTradingViewScript = useCallback(() => {
        if (!document.getElementById("tradingview-widget-loading-script")) {
            const script = document.createElement("script");
            script.id = "tradingview-widget-loading-script";
            script.src = "https://s3.tradingview.com/tv.js";
            script.type = "text/javascript";
            script.onload = () => onLoadScriptRef.current?.();

            document.head.appendChild(script);
        } else {
            onLoadScriptRef.current?.();
        }
    }, []);

    useEffect(() => {
        loadTradingViewScript();
    }, [loadTradingViewScript]);

    useEffect(() => {
        onLoadScriptRef.current = createWidget;
        onLoadScriptRef.current?.();
        return () => (onLoadScriptRef.current = null);
    }, []);

    return (
        <div
            className="tradingview-widget-container overflow-hidden"
            style={{
                height: "100vh",
            }}
        >
            <div id="tradingview_de838" className="h-100" />
        </div>
    );
}
