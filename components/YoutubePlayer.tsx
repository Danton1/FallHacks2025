import { generatePlaylistUrl } from '@/constants/youtube-playlist-links';
import React, { useMemo } from "react";
import { Platform, View } from "react-native";

type Props = { query: string };

export default function YoutubePlayer({ query }: Props) {
  const q = encodeURIComponent(query);
  const url = generatePlaylistUrl();

  if (Platform.OS === "web") {
    return (
      <div
        style={{
          height: 260,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden" as any,
        }}
      >
        <iframe 
          style={{ border: 0, width: "100%", height: "100%" }}
          src={url}
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          loading="lazy"
        >  
        </iframe>
      </div>
    );
  }

  const WebView = useMemo(() => require("react-native-webview").WebView, []);
  return (
    <View style={{ height: 260, width: "100%", borderRadius: 12, overflow: "hidden" }}>
      <WebView
        source={{ uri: url }}
        originWhitelist={["*"]}
        javaScriptEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}
