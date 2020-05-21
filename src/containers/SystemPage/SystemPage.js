import React, { useState } from 'react'
import { useTrail, animated } from 'react-spring'

const items = ['Lorem', 'ipsum', 'dolor', 'sit']
const config = { mass: 5, tension: 1000, friction: 100 }

export default function System() {
    const [toggle, set] = useState(true)
    const trail = useTrail(items.length, {
        config,
        opacity: toggle ? 1 : 0,
        y: toggle ? 0 : 100,
        from: { opacity: 0, y: 100, height:100 },
    })

    return (
        <div className="trails-main" onClick={() => set(state => !state)}>
            <div>
                {trail.map(({ y, height, ...rest }, index) => (
                    <animated.div
                        key={items[index]}
                        className="trails-text"
                        style={{ ...rest, transform: y.interpolate(y => `translate3d(${y}px,0,0)`) }}>
                        <animated.div style={{ height }}>{items[index]}</animated.div>
                    </animated.div>
                ))}
            </div>
        </div>
    )
}


