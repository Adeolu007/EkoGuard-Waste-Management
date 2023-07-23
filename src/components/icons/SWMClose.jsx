const SvgSWMClose = ({ size, color, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM13.178 11.4374C12.6973 10.9568 11.9181 10.9568 11.4374 11.4374C10.9568 11.9181 10.9568 12.6973 11.4374 13.178L14.2594 16L11.4374 18.822C10.9568 19.3027 10.9568 20.0819 11.4374 20.5626C11.9181 21.0432 12.6973 21.0432 13.178 20.5626L16 17.7406L18.822 20.5626C19.3027 21.0432 20.0819 21.0432 20.5626 20.5626C21.0432 20.0819 21.0432 19.3027 20.5626 18.822L17.7406 16L20.5626 13.178C21.0432 12.6973 21.0432 11.9181 20.5626 11.4374C20.0819 10.9568 19.3027 10.9568 18.822 11.4374L16 14.2594L13.178 11.4374Z"
        fill="white"
      />
    </svg>
  );
};
SvgSWMClose.defaultProps = {
  size: 32,
  color: "currentColor",
};
export default SvgSWMClose;
