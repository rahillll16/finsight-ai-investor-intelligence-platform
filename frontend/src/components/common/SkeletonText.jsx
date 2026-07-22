function SkeletonText({ width = "w-full" }) {

    return (

        <div
            className={`
                h-4
                ${width}
                rounded
                bg-slate-800
                animate-pulse
            `}
        />

    );
}

export default SkeletonText;