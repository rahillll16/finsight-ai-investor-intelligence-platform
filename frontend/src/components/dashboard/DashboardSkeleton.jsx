import SkeletonCard from "../common/SkeletonCard";

function DashboardSkeleton() {

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {Array.from({ length: 4 }).map((_, index) => (

                    <SkeletonCard
                        key={index}
                        className="h-36"
                    />

                ))}

            </div>

            <SkeletonCard className="h-40" />

            <SkeletonCard className="h-64" />

        </div>

    );
}

export default DashboardSkeleton;