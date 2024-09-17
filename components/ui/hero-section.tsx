'use client'
import { Hero, Solution } from "@/lib/cpt-types"
import { usePathname } from "next/navigation"
import parse from 'html-react-parser'
import { fontSecondary } from "@/components/ui/fonts";
import { ArrowRightIcon, ChatBubbleIcon } from '@radix-ui/react-icons'
import Link from "next/link";
import { Button } from "./button";

type HeroSectionProps = {
    hero: Hero,
    solution?: Solution,
    targetPage: string
}

export default function HeroSection({hero, targetPage, solution}: HeroSectionProps) {
    const pathname = usePathname()
    const solutionExcerpt = parse(solution?.excerpt?.rendered ?? "") ?? "";    // const hero = props.hero

    let bgImage = ""
    if (pathname === '/') {
        bgImage = "bg-hero-home bg-cover bg-no-repeat"
    }

    return (
        <section className={`bg-black dark:bg-gray-900 ${bgImage} text-stone-400`}>
            <div className="mx-auto max-w-5xl p-8 py-16 flex flex-wrap lg:flex-nowrap justify-between">
                <div className="w-2/3">
                    <div className={`text-5xl text-white ${fontSecondary.className}`}>
                        {targetPage === "home" ? hero.meta.subtitle : solution?.title?.rendered}
                    </div>
                    <div className={`mt-4 mb-8 text-5xl text-accent ${fontSecondary.className}`}>
                        {targetPage === "home" ? hero.title.rendered : solution?.meta.short_desc}
                    </div>
                    <div className="text-md">
                        {targetPage === "home" ? parse(hero.content.rendered) : solutionExcerpt}
                    </div>
                    <Link href="/kontakt" title="kontakt z nami">
                        <Button className="w-[200]" size="lg">Kontakt <span className="ml-2"><ChatBubbleIcon /></span></Button>
                    </Link>
                </div>
                {targetPage === "home" && <div className="w-1/3 px-4 py-8 flex flex-col gap-4 text-md border b-2 border-muted rounded-sm">
                    <div className={`text-3xl text-white ${fontSecondary.className}`}>
                        {hero.meta.announce_title}
                    </div>
                    <p className="pr-4">
                        {hero.meta.announce_desc}
                        <ArrowRightIcon className="w-5 h-5 float-right text-accent" />
                    </p>
                </div>}
            </div>
        </section>
    )
}