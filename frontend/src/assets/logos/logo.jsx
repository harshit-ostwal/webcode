import { Heading } from "@/shared/components/ui/headings";
import { IconTrees } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function Logo() {
    return (
        <Link href="/">
            <Heading
                size="h3"
                className="font-bold inline-flex items-center gap-1"
            >
                WebCode <IconTrees color="green" size={32} />
            </Heading>
        </Link>
    );
}

export default Logo;
