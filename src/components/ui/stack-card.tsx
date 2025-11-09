"use client"

import * as React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Image from "next/image"

const cards: [string | React.ReactNode, string][] = [
    ["", "/images/aboutme-2-image/Card background.png"],
    [
        <>
            Over the years, I&apos;ve been delivering impact by improving the businesses through design.
            <br /><br />
            Previously at{' '}
            <a 
                href="https://www.megaphone.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
            >
                Megaphone
            </a>{' '}
            I helped brands reward their community and go onchain at Megaphone as their Founding Product Designer.
            <br /><br />
            At{' '}
            <a 
                href="https://pomelo.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
            >
                Pomelo
            </a>{' '}
            I worked on helping immigrants like myself to remit money fee-free, on credit, as their Second Product Designer.
            <br /><br />
            I helped clinicians work efficiently at a Medtech Startup called{' '}
            <a 
                href="https://www.see-mode.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
            >
                See-mode
            </a>. I was their first design hire and built the design foundations of their ultrasound web application.
        </>,
        "/images/aboutme-2-image/Card background 6.png"
    ],
    [
        <>
            <span style={{ fontSize: "19px", fontWeight: 500, fontFamily: "Bricolage Grotesque, sans-serif" }}>Inviting</span>
            <br /><br />
            The best products feel welcoming. They invite users into a delightful experience. The best products are also built collaboratively, so I invite collaborators into the design process.
            <br /><br />
            I do this by:
            <br />
            ⊹ Speaking common languages such as user needs
            <br />
            ⊹ Create shared artifacts
            <br />
            ⊹ Design in systems
        </>,
        "/images/aboutme-2-image/Card background 2.png"
    ],
    [
        <>
            <span style={{ fontSize: "19px", fontWeight: 500, fontFamily: "Bricolage Grotesque, sans-serif" }}>Imaginative</span>
            <br /><br />
            I&apos;m the voice of vision in rooms full of people focused on what&apos;s feasible. I constantly ask &quot;what if?&quot; and then explore possible paths.
            <br /><br />
            ⊹ Prototyping &amp; building as proof
            <br />
            ⊹ Painting the vision
            <br />
            ⊹ Socializing user stories
        </>,
        "/images/aboutme-2-image/Card background 3.png"
    ],
    [
        <>
            <span style={{ fontSize: "19px", fontWeight: 500, fontFamily: "Bricolage Grotesque, sans-serif" }}>Play</span>
            <br /><br />
            Friends often describe me as fun, playful, and creative. I believe delight doesn&apos;t always mean playful animations, sometimes it&apos;s about giving people an experience they didn&apos;t know they could have.
            <br /><br />
            ⊹ Surprise through excellence
            <br />
            ⊹ Personality in the details
            <br />
            ⊹ Intentional joy
        </>,
        "/images/aboutme-2-image/Card background 4.png"
    ],
    [
        <>
            <div style={{ position: "relative", marginBottom: "16px" }}>
                <a 
                    href="https://substack.com/@eggsvans" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: "inline-block" }}
                >
                    <Image
                        src="/images/aboutme-2-image/substack-app-icon.webp"
                        alt="Substack"
                        width={32}
                        height={32}
                        style={{ display: "block" }}
                    />
                </a>
            </div>
            <span style={{ fontSize: "19px", fontWeight: 500, fontFamily: "Bricolage Grotesque, sans-serif", display: "block", marginBottom: "12px" }}>AI Design Guides</span>
            <br />
            I love bringing my ideas to live with AI coding and I share how I do it by writing AI Design guides on{' '}
            <a 
                href="https://substack.com/@eggsvans" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
            >
                Substack
            </a>.
        </>,
        "/images/aboutme-2-image/Card background 6.png"
    ],
    ["Thank you for stopping by! Feel free to drop me a hello at eggsvans@gmail.com", "/images/aboutme-2-image/Card background 7.png"],
]

export function ScrollTriggered() {
    return (
        <div className="w-full" style={container}>
            {cards.map(([content, backgroundImage], i) => (
                <React.Fragment key={i}>
                    {i === 2 && (
                        <div style={headerStyle}>
                            <h2 style={headerTextStyle}>My Design Principles</h2>
                        </div>
                    )}
                    <Card i={i} content={content} backgroundImage={backgroundImage} isLastCard={i === cards.length - 1} />
                </React.Fragment>
            ))}
        </div>
    )
}

interface CardProps {
    content: string | React.ReactNode
    backgroundImage: string
    i: number
    isLastCard?: boolean
}

function Card({ content, backgroundImage, i, isLastCard = false }: CardProps) {
    // URL encode the image path to handle spaces
    const encodedImagePath = encodeURI(backgroundImage)
    // 3rd card from top (index 2) should have 30% opacity
    // 4th card from top (index 3) should have 40% opacity
    // 5th card from top (index 4) should have 60% opacity
    const opacity = i === 2 ? 0.3 : i === 3 ? 0.4 : i === 4 ? 0.6 : 1
    
    const isFirstCard = i === 0
    
    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div 
                style={{ 
                    ...splash,
                    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
                    backgroundImage: `url("${encodedImagePath}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                    opacity: opacity,
                }} 
            />
            <motion.div 
                style={isFirstCard ? cardWithMap : isLastCard ? cardLastCard : card}
                variants={cardVariants} 
                className="card"
            >
                {isFirstCard ? (
                    <div style={mapContainerStyle}>
                        <div style={mapWrapperStyle}>
                            <div style={mapScaleStyle}>
                                <video
                                    src="/images/aboutme-2-image/4db392b218894266869622081a4d6a82 2.MOV"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={videoStyle}
                                />
                            </div>
                        </div>
                        <p style={mapTextStyle}>
                          Born and raised in Singapore, moved to the US because I love the culture.
                        </p>
                    </div>
                ) : (
                    <div style={cardTextContainerStyle}>
                        {typeof content === 'string' ? (
                            <pre style={cardTextStyle}>{content}</pre>
                        ) : (
                            <div style={cardTextStyleDiv}>{content}</div>
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 3.0,
            stiffness: 30,
            damping: 25,
        },
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 2.2,
            stiffness: 45,
            damping: 23,
        },
    },
}

const container: React.CSSProperties = {
    margin: "50px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
}

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "5px",
    marginTop: "220px",
}

const headerTextStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 400,
    fontFamily: "Bricolage Grotesque, sans-serif",
    color: "#333",
    margin: 0,
}

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -20,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}

const card: React.CSSProperties = {
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    borderRadius: 20,
    background: "#f5f5f5",
    position: "relative",
    zIndex: 1,
    padding: "20px",
    overflow: "hidden",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
}

const cardLastCard: React.CSSProperties = {
    ...card,
    height: "380px",
}

const cardWithMap: React.CSSProperties = {
    ...card,
    background: "#ffffff",
    padding: "24px 12px 12px 12px",
    overflow: "hidden",
}

const mapContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "visible",
    justifyContent: "flex-start",
}

const mapTextStyle: React.CSSProperties = {
    fontSize: "13px",
    lineHeight: "1.4",
    textAlign: "center",
    color: "#333",
    margin: 0,
    marginTop: "20px",
    fontFamily: "Sequel Sans Book Body, Sequel Sans, sans-serif",
    flexShrink: 0,
    position: "relative",
    zIndex: 2,
}

const mapWrapperStyle: React.CSSProperties = {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    flex: "0 0 auto",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "0",
    marginBottom: "0",
    paddingBottom: "0",
    minHeight: "293px",
    height: "auto",
}

const mapScaleStyle: React.CSSProperties = {
    transform: "scale(3)",
    transformOrigin: "top center",
    width: "33.33%",
    height: "33.33%",
    maxHeight: "650px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: "0",
    paddingTop: "0",
    alignSelf: "flex-start",
}

const videoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.5,
}

const cardTextContainerStyle: React.CSSProperties = {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    width: "100%",
    paddingRight: "4px",
}

const cardTextStyle: React.CSSProperties = {
    fontSize: "13px",
    lineHeight: "1.4",
    textAlign: "left",
    color: "#333",
    margin: 0,
    fontFamily: "Sequel Sans Book Body, Sequel Sans, sans-serif",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
}

const cardTextStyleDiv: React.CSSProperties = {
    fontSize: "13px",
    lineHeight: "1.4",
    textAlign: "left",
    color: "#333",
    margin: 0,
    fontFamily: "Sequel Sans Book Body, Sequel Sans, sans-serif",
    whiteSpace: "normal",
    wordWrap: "break-word",
}
