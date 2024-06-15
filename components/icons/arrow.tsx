import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface Props extends  SvgProps{
    color?: string
}
const ArrowIcon = ({color, ...props}: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ? color: "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M25.333 16H6.667m0 0L16 25.333M6.667 16 16 6.667"
    />
  </Svg>
)
export default ArrowIcon
