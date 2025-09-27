import React, { useMemo } from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";

type Props = { query: string };

export default function YoutubePlayer({ query }: Props) {
  const q = encodeURIComponent(query);
  const url = `https://www.youtube.com/embed?listType=search&list=${q}&autoplay=0`;

  const WebView = useMemo(() => require("react-native-webview").WebView, []);

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
          src={url}
          style={{ border: 0, width: "100%", height: "100%" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <View
      style={{
        height: 260,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
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
