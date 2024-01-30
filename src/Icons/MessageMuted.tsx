import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
}
const SvgMessageMuted = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="message-muted_svg__lucide message-muted_svg__lucide-message-square-off"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M21 15V5a2 2 0 0 0-2-2H9M2 2l20 20M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10" />
  </svg>
)
export default SvgMessageMuted
