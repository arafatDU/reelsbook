import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-gray-900 shadow hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="text-lg font-semibold text-white mb-1 truncate">
            {video.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-300 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
