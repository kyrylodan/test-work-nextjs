import React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="uk">
        <body>
        {children}
        </body>
        </html>
    );
}

