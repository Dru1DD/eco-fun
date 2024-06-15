import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends  SvgProps{
    color?: string
}
const InfoIcon = ({ color, ...props }: Props) => (
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
      d="M16 21.333V16m0-5.333h.013M29.333 16c0 7.364-5.97 13.333-13.333 13.333-7.364 0-13.333-5.97-13.333-13.333C2.667 8.636 8.637 2.667 16 2.667c7.364 0 13.333 5.97 13.333 13.333Z"
    />
  </Svg>
)
export default InfoIcon
