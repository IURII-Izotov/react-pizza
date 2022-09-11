import React from "react"
import ContentLoader from "react-content-loader"

export const Skelenon = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="135" cy="135" r="136" />
        <rect x="6" y="304" rx="0" ry="0" width="291" height="71" />
        <rect x="6" y="401" rx="0" ry="0" width="99" height="53" />
        <rect x="180" y="403" rx="0" ry="0" width="119" height="53" />
    </ContentLoader>
)

