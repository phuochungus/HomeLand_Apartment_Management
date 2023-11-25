export const SearchIcon = ({
  width,
  height,
  className,
  onClick,
}: {
  width: any;
  height: any;
  className?: any;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_377_1416)">
        <path
          d="M19.375 17.5H18.3875L18.0375 17.1625C19.2625 15.7375 20 13.8875 20 11.875C20 7.3875 16.3625 3.75 11.875 3.75C7.3875 3.75 3.75 7.3875 3.75 11.875C3.75 16.3625 7.3875 20 11.875 20C13.8875 20 15.7375 19.2625 17.1625 18.0375L17.5 18.3875V19.375L23.75 25.6125L25.6125 23.75L19.375 17.5ZM11.875 17.5C8.7625 17.5 6.25 14.9875 6.25 11.875C6.25 8.7625 8.7625 6.25 11.875 6.25C14.9875 6.25 17.5 8.7625 17.5 11.875C17.5 14.9875 14.9875 17.5 11.875 17.5Z"
          fill="black"
          fill-opacity="0.88"
        />
      </g>
      <defs>
        <clipPath id="clip0_377_1416">
          <rect width="30" height="30" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const SortIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="30" height="30" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_377_1536" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_377_1536"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO3buRHDMBQDUXbt0ApdAlgtnLgBR/jHYoaxNPuUMNA5jDHGGGOMMcYYY4w12L33ufd+0u+xOb5/B4RgfIOQj28Q8vENQj6+QcjHNwj5+AYhH98g5OMbhHx8g5CPbxDy8Q1CPr5ByMc3CPn4BiEf36sRisT3SoRi8b0KoWh8r0AoHt+jEZrE90iEZvE9CqFpfI9AaB7frRGGxHdLhGHx3QphaHy3QBge36URlsR3SYRl8V0KYWl8l0JgjDHGGGOM7ZqkV4ELkRNH0vtU2EYEVYm/EUHV4m9CUNX4GxBUPf5kBHWJPxFB3eJPQlDX+BMQ1D1+ZwRNid8RQdPid0LQ1PgdEDQ9fmUEbYlfEUHb4ldC0Nb4FRC0PX4SgfhBBPHl5xBE/ByCiJ9DEPFzCCJ+DkHEzyGI+DkEET+HIOLnEET8HIKIn0MQ8XMIIn70H+Un9HjGGGOMMcYYY4wxxs4/+wKXUcNbw4zaXwAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
export const AddResidentIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="30" height="30" fill="url(#pattern1)" />
      <defs>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_501_696" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_501_696"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFElEQVR4nO2dXYhWRRiAJ43cylJLTQk0DCMMjYhu6qJuoqJLK0utoAulROznwotuVKjsz6DAcku669abfi68iCjbioiiqLSLwOii3W39SalV2ifevllYzW3mnDNn3pnvzAMLy/m+PfP+nPPOvDPvzBpTKBQKhUKhUCgUCoVCoVAoJAZwKfAA8CbwBTAMnLI/w/baIHA/cIm2vH0DcA2wFziJP/Ldt4Dl2vJnC3Ah8BJwmvrI2/ECMKCtT1YAy4FvCccQsFhbrywAbrAxPTS/AKu09cvhyR9uwfhTnbBIW88kAQaAr2mfL6V/0dY3Oeh1uLHYrq1vikPN0xEd8EcJRWc6YC/x2a33yKWX4Z5UcMCJkjGbfx0g0wtarDFdh97cjhZ7TNehN4mmxZDpOsCIogN+M10HGFd0wF+m61AcoO6AEcU3oIQgSies/gYMKr4Bb5iuQ28NV4t7TdcBZttpgdhIm7O19U8CegvosRnU1ju1lbBTEY0vuccybb2Tgl71Qiye09Y31SXJoQjG/xSYpa1vkgCLgMMtGv9X4EptPZMGWGWrF0Ijjl2prV8WAAuAjwKHnVKOUtEJs6R6oWGOIKOdZ0vMb94v7K7oCPnunjLUDJ8xr5H5G+Azmcm0T/i4/V2uvQ7cVzLcQqFQKBQyAVhoO/hXgA+Ag8DYlE5+zF6Tz3bZjn6BttxZA8wDHrPzTxM1cowJm+A9CszV1ie3vOJFWyEdiuPA88AV2volC3A+sAU4RntIArhV2tLWNymAZZGrLz4HrtLWOwmAu4GjxEc67jtNlwHWR17qPBvZ9fOI6SLAwzVHN6ERGdab3ADmALfYp/hpW8C1D7jIM+zE3HPmQt7CO0yqABcDtwJPAe8Ah6Z5end5drhHSA/pE5aaVACuBZ4E9kuZuIcCf7qOG7BDTc0NHy4k6ZsZz8r/NdCNwGvAzzWEf9Xj/k+QPpvjWPvMWC4p/1cNBb/eI8OVjLQRHvo0RYbEC4Ma+X9CzNuBtqD+4NGeTC80xqOdEOwMZuhzCHi17Uj/JhzbPCbWgszteOgXguPBJ/DsAUs7bGcZmuscbUuIIyMHCBtDGn8l8B3tDd/Oc7QvC/K5OeBAKOOvbempn2S/x2LKRIYOkBA9v6nxNweO9ZUrme1KFhk6QLin6daiCe1tRPSWEXN1wMtNYn6bYWcqNztkkXVab2opXM02VXivbiMfEo8VDll+qnKzuoatYJsqHKrTwG3EZbFDntEqN2tiXE/7VGEkh329AyHPmmhiXE/7tHtWBfA9cbnAIU/nHNB4wqsilznk+b3KzZoY19M+VRhuu4EQLO3jTvhg2w2E4CaHPO9XuVkT47Zgn3fbbiAE6xzydCsRIz7bHPJIoWwwIuu/OgcH7PPYUZnrZNzlOThgFJjhkEmqlIMQUf+PKxtfyQG4zv23JeJBiKj/hpwcsNUh09xQ+Ukk/aVCe05ODvgm1mkrkfR/ppbxFR2A65wH2RwRovY/gv5H+nZ7E/A46bPJ9Cv0ShODLdC3wAHV0sQYAEuqrhFEYqwzu2aAu5Q3ZpyNTJnfbroE8GAiGzQk411rugiwTvlNGO+s8SeRnSk2/sZmtHNhZzpkUSfSiYxTRztLphWoiwAzgIdaHiEdtZvB+3uo2QRbS7oz8Nr2MXs2XX9muG1gJ/A22nBRp75V/uYTmdWsPbFWMJPOmC+FsrJEKOWCwI82VE0eVyO/yzX5TP7n5epaiynn4B/iafXOphlvMAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const CloseIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="16" height="16" fill="url(#pattern2)" />
      <defs>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_376_1294" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_376_1294"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB5UlEQVR4nO2dzVLCMBgA+0x6wDfDmx59WZ2+wToM5uAMYkHk+8numQPdTSYlzdBlERERERERERERkVoAz8BuaQ6wO1zrkgnglSMr8LQ0BXgEPr6u9W1JJp/OEfgunxQRTshvGYHT8mMjnJHfKgLn5cdE+Fpwt7BWXpg5LriHa9jC/RZm4AF4vyDCU9ORHzfQOkcgu/zOEagiv2MEqsnvFIGq8jtEoLr8yhHoIr9iBLrJrxSBrvIrRKC7/MwRmEV+xgjMJj9TBGaVnyECs8uPjIDy4yKg/LgIKD8uAsqPi4Dy4yKg/LgIKD8uAsqPi4DyQ8/irBd+tucv3OCZsAXlB0ZYHflxM2FVflyEVflxEVbl3xAuu9VMc+RlVvkDIwTKHxghUP7ACIHyB0a4QP7OrYgguGJjLcORlxbwh11NIwTKHxjhSrjhfr4RAuUPjLCR/3yShQtznPyBEX7gns9wcSbEyR8YIcERcWafCRmOjjBrhAzyp42QSf50ETLKnyZCZvntI1SQ3zZCJfntIlSU3yZCZfnlI3SQXzZCJ/nlInSUXyZCZ/klIvjXxSe57zsFgD0NR/6VM+FlieBMhBbyN0Z4if5y+87yf4kQK/9EhJbyf4iQQ/7Al/iIiIiIiIiIiIjIkplPEtv2p25zkkEAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
export const EditIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283Z"
        fill="white"
      />
    </svg>
  );
};
export const ErrorIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 60H52V68H44V60ZM44 28H52V52H44V28ZM47.96 8C25.88 8 8 25.92 8 48C8 70.08 25.88 88 47.96 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 47.96 8ZM48 80C30.32 80 16 65.68 16 48C16 30.32 30.32 16 48 16C65.68 16 80 30.32 80 48C80 65.68 65.68 80 48 80Z"
        fill="#FF2E2E"
      />
    </svg>
  );
};
export const SuccessIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_619_809)">
        <path
          d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 80C30.36 80 16 65.64 16 48C16 30.36 30.36 16 48 16C65.64 16 80 30.36 80 48C80 65.64 65.64 80 48 80ZM66.36 30.32L40 56.68L29.64 46.36L24 52L40 68L72 36L66.36 30.32Z"
          fill="#2A9928"
        />
      </g>
      <defs>
        <clipPath id="clip0_619_809">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const WarnIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 23.96L78.12 76H17.88L48 23.96ZM48 8L4 84H92L48 8ZM52 64H44V72H52V64ZM52 40H44V56H52V40Z"
        fill="#FFC566"
      />
    </svg>
  );
};
export const BuildingIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="44" height="44" fill="url(#pattern432)" />
      <defs>
        <pattern
          id="pattern432"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_759_693" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_759_693"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABUElEQVR4nO2UwQnEMBDE3H/Tuh5iOHltCeYZCBrPrhUREREREfF/kPM8VIALFVABo+Hx6PB4dHg8OjweHR6PDo9Hh8ejw+M5jt0fZvj3OrYAKmC2QFrAqoAd7BdIC5gtkE7QqoAd7BdIC7g7x2MLogJ8SbQAXxSdoDtzPLYgKsCXRAvwRdEJ+nZDGf69ji2ACpgtkBawKmAH+wXSAmYLpBO0KmAH+wXSAu7O8diCqABfEi3AF0Un6M4cjy2ICvAl0QJ8UXSCvt1Qhn+vYwugAmYLpAWsCtjBfoG0gNkC6QStCtjBfoG0gLtzPLYgKsCXRAvwRdEJujPHYwuiAnxJtABfFJ2gbzeU4d/r2AKogNkCaQGrAnawXyAtYLZAOkGrAnawXyAt4O4cjy2ICvAl0QJ8UXSC7szx2IKoAF8SLcAXxasnKCIiIiIiIiIi1pH8AIN9c0RlQ7dnAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const ManagerIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern998)" />
      <defs>
        <pattern
          id="pattern998"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_833_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_833_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADrklEQVR4nO2cy28NURzHPxKPSsqqhEgsUAmJJiJBUsGu/4BXI9aCna1odEMi3Yi36tLGxl+gxQIpEY8lK0L0dkFoq+oxctLfjeu60Rl3Zn5z7/1+kt9mOr2/1zlnfmfOmQNCCCGEEEIIIYQQQhSPpUAvMAiMAiVgxqRk164BB4Al3sY2E+uBIWASiGJKuPc60OltfCOzGBgAviUIfLWE3nEWaPN2ptHoBF7UEfhqeQCs9HaqUdhsY3qUsrwBuryda4SWX8og+JVJWOHtZFFpA55mGPyyPLbni6hiIIfgl6W/Wnmrs77OaiepfNZQ9CdDOQa/LJecGlshZ7iTDgmY0Ix5ll6H4Jdlv9nQ0gw6JuCqt/NFYNQxAWGG3PKMOyZgrOWjD3x1TMC0EoAS4M24hiBfRvUQ9uWaYwKuOPteCA44JmCvt/NFoN1eC+Qd/AnTLZhdQM87AWHoExUrYTM5Bj/MPdaUlYtZzuaYgDOmU1QtST7IIfj3gUWVisVvwoL56wyD/xZYVaFP1KDLdi+kHfyQ2E21FIq/WQbcTXnY0XaUhCyy3QsTdVY7pzXm18cKW0BPkogJW+1SqZki7baGG97fPLTFlK8mY3btMrBPM1whhBBCCCGEEEIIIZJ/ObPF9g31ATeAYfvK8ZV9zjptUrJr4W+37d4++9/wGzo7Yg4WANuA48AtWzrMYjnylunYZjpblnnAVltwGXb6RmzSdPebLcGmpiY4uMPe2b9zCHgUo4cE27qbLRnLgRPAy5QD9gk4ZPIp5d9+aTaHtemGZaN9//slg9b6CFhXoWudXUtbzxfbNrmBBmK1rcd+zyAgP4FzwMIaeucDp4AfGegNv3kTWEuBWWil33QGAYiA90BPDDt67N4sbAi+nSxiBdWV8gFLUQ0ZSWDPSMa2PC/SJq+9Oe7v3x3Dnt05HvixB2eO2Lich8NRzF6QdeuvlOD7YZw4mNEDL6qjF+TV+ivlh73yyP18nykHZyPg6D/sOuZk01TeR2Tec3I0KmAPKMudvILf7ehkNMfstMPZtu3NfrzMWAz7xpr9+Jtnjg6OFKwKqpYnOcSfj44OXohh30VH+z7kEH835yKbd8zFUWcbM8fTuV0x7Av3KAEZBWFZjAQkrYTSboCZ0wjHi5WUgPQTMJwgAUkqobQbYNP2gPMJbAzVkhLgUAH9TyWUlJbtATsT2JikEkrb/6ZNQEcCG5NUQmn7nzkewX//H3bGfSeUtv9CCCGEEEIIIYQQQlCLX+PxlBqSeNXFAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const TechnicianIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern999)" />
      <defs>
        <pattern
          id="pattern999"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_833_768" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_833_768"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO2dyWsUQRSHf0aj4oaBuOFBZXLRJAgq/gfiwRgPiogiasT15i1B8SSoiFldTiqYg+JNcIOoBxH1oAET14OKoiKCWxJjNNGWIjUwhMlUVXdt0/U+aAikp7av+/XrmqoEIAiCIAiCIAiCIJKyEEAjgCcA+gBEgoPQRCmAJgCDEoNOAgwM/nXFgac7QCNNMQefQpCmmK8adkiAJ1c/3QEaYNkOCXBILwlwC4UYx5AAx5AAx3gnoBpAS85cSB//uRlAlYsGhcIEAKcA/C1wNQwBOAFgvOvGpnHwbyukY7dIgl5Ox8iF2zS3IViqBWGnUDiqdN34NNCS4FW80XXj08DTBAK6XTc+DfQkENCjWNcYTeekiiQCfijUMw3AJYnzLgMoUyg3cnwURQiakjPtK4Kd08U/E4SAZgsP4YsKDc6edyEUAVU8pVSteAjAIonylyo2OPfcJSEIAJ9eUK24RbLsswkEnAlFAJvbualQaQdfyiFDVwIBr0MRkJXQJghHQ/zKlx38fF/5icg9dyAkAVkq+cO1mw9eL//5uGTMH8mnBAJ6QxSgm3sJOvcwRn0kYAT7EwxKPdQhASOYAaA/xsCwz5RDHRKQh80xBmY74lE0AmYDOAjgPoDveQr+wn93IOaVOJKjCp06DDdzW9YE7JHcfJA9WKe2ITnrJepi57ia27Ii4EiCyq4AqEg4QJGpW1rTYlujAjZoqJC9HB0CMMlTAZUx57aMC5gI4L3Git8CWOehAPA3eu8ErDXUgA6+ycEnAapzW1YEnDPYiD8AjgGY6omArIRWC+FImjcWroYPADYJvte1JWC0uS0nAuZbGPzI9hWlCSvt2erBwEYhCzAZ/yMS4Ef8j+gOsBP/PwJ4kCIBPYL2yC6PsRb/WTgrAVAH4HMKBLwQtKfGt/i/Jafs6fytc7CIBVwVtKdb8v3GWvyfl6eOxQDuFKmAvRJtYqv6auOI0B3/mcykRJ4JmGvyb0Xojv9skVXaBIDvjTMiwGT8T5OAWQC+mRBgI/6nQQBjRcxQVFTx32cBjJ0xZk+t5v9pF8BYqRiOjDxY8h1MaAgCss+Ek/x7jtjtvaFZAAtpoQjIMgfAbr4Y4dko3yeMyjXNAmSOhkINCo1WBwLaXXfaJ2ocCOh03WmfGM+XjtgU0A9grOuO+8QuB3dBxnWnfaKU77OyKaDWdad9Y4dlAQ2uO+zjXfDKooB21x32kTqJgWN7hWVYIyin03BfihKWmbwUDNxvydnOCkE5vygTij85x+aPRJRI7PnKKF4gwdwFohUAbPJpgURZLMxElAmZ2SzHpjBEsAdtRJlQvLvguWDw2FqfcYJyWKoZUSYUj40Sd8EyQRnsZSuiTKjwnwcrG+Uol3gvWCUQkBF8vj+kTMjEyxTL9UWZ0E9BGUl3UwYtQCaN7KRMyIyAd/wKF3GeMiEzAvZJ3nn1lAkN80/j4D8GMFlSwGrKhIYZ0rjDUWXlQ0ZQXjCZkMzaFdHB/o/iTMV6SygTGmYgz4CybTdfCxxsm9FdvvhoeQL5jygTIgiCIAiCIAgCgfEfuEbpvUxO5DwAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
export const DetailIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern93)" />
      <defs>
        <pattern
          id="pattern93"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_844_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_844_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEI0lEQVR4nO3cyWvXQBTA8RGsghuK3kStoFUPLnh2w+pZFP0PvKlV1Jvb2QUKrvgPVClorZ49ugvu2npUcLfgjhtfeWQKRTQz+f2SX5KZ94GAtHWmv7xkMvPmNcYopZRSSimllFJKKaWUUkopFTVgLNAFXAc+20P+vU2+V/bvFzRgOnCX/7sjP1P27xnylZ928kcGwftOIDKmiQDIsONrqwYg/wDcwN81DUD+AfiEv08agHID8EEDkH8AdAgqOQAyz/elD+ECAjDWTjFd5GfGZGg3KiaHhVhaEHQhVjS5umWIkammfTDLcdV+zfvKV0oppZRSSimllFJKOWhdUIm0LqhEEdUF/bSVfkeAzcByYDYwBWgr9izHWxf0HbgAbAQmmSoKdFP+HbAfmGaqLmNZyscM7ZbhC7AHGG/qIqAAXARmmboJYAj6BmwxdVXzuqAXwFJTZzWuCxqUaaQJQSx1QSSlNyuBA0Af8BgYAn7YY8h+rc/Oola0bI0Qcl0QMB84bqenWb0FjgHzyv4ctQO0A73Ab5onbZwFZpb9uSoPGAXstOuCvEmbO6SPsj9nJQETgUsUT1IcE8r+vJUCTANu0Tqyhppa9ueu0pV/m9a7Gf2dQDLmt2LY+Z++qJ8JJA/cLJ4AB4HVwBxJ3tljLtAJHAIGMrbZZWIEzLSvVfAhi6xNvlcrsMZzs2p4dtRuYkMyz/chi6nRDbTfBpzw7KPHxIRkheuzyNrRomHuF9BhYkGSXnA5lmN/Jz36O2piQJK7kjxNmoeNDDuO4Uge4GleN9Rn3eqCgFUeV+O6Avrd4NHvsuDfF0SSUk7zpMA1h+xFpNkbQl1Qp6N9ycWkOWgKAhx29H0+hLqgOY72ZU7fcACbAax19P0whE35yY723zcTwGbYFXOadyG8L6jN0b5UvaUprDZIkm+Ovr+H8L6gtiYDMKHgzGuaL1ka0yEo/yHoWQh1QXMd7T+q8EP4Tgh1QZ2O9iUHn+aQKYgtcU/TG3xdEEndTpqBIjZJ7ELsqaPvXcHXBZEUTbmsL6Bf+VuDfFMRdUSSGHvjOBGP8qxssxepa6fsVZ4JwEoj2WRxOZFjf6c9+us2sQDmeW7I7Myhr934WWJiApzxPDGnGhmO7LDjc+WLfhMbYEaGTfmBBjbl73u2LXfiYhMjYDvZDNqUspzgjhFlKR12kXXEY6r5t4/AQhMjkrm5a3+gFd7EHIRxwJWKBGGRiREwNWNyscggRHsnjPfIE7UqCItifiZsyzA7yuK3feBqEDynqD05/YmS6JehxR6uNMiwt9HeCcPs9PKoLZrKSnI73X+vcDMG4fLI/xstYLRkKoF9wDnggd3cl+3Nr8BzW6LTa2tBl6Ul1jyDcK8WLw2pK2AB8FJPfvWCoFd+iUHQk29KILMdeeD+a8z/A7uP0mi/ltj5AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};
export const AssignIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#patter34643)" />
      <defs>
        <pattern
          id="patter34643"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_906_768" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_906_768"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2cT4hXVRTH7wgKmRCIMZZatojW06IEhTFkJCUjWkngJmhRNpWrXLYUXYULi1LxTy7EhSmai1qIIkrtJJpICmrREGiOExnm+JGr54cWzu/d93v33vO873xgYOYHv/l9v+fc9+499573c84wDMMwDMMwDMMwDMMwDMMwDKMBwFPAOHAKmAD+kp8Jee1dYJlWkNuub2CAJcCnwE2qmQEOA8tNX5zgvwZMU59rwKtd19cI4H0Z0YMyA7zXVX0xRlYTcz1mUoy0tutrBLB0wMu63+X+ZFf0NQbYQ3w+64q+GEu5kNVOXW76kVu6vsb4SYl0bC5dX2OArxIaPFG6vsYAPyU0OFG6vsZEXl38n+nS9bmWG5wqXV9jgB8TGvyhdH2u9EmOlutrjGzZpuLt0vU1xu+XJyp0/o1UiLVaXxSAzxMY/KQr+mIdwPgNqlhMAU90RV8UgHWRLvUZYEPX9EVB9l2aHniMd1VfFPxhxYCX+xTwStf1RQF4HPhYVgoho2p/zntq2/W5yCdRm4GTvmqUbYFp+f0E8I7mUq7t+gzDMAzDMAzDMEKqy1HgLWAH8CXwHfA98AtwBbgh1eVV+fs34AJwDNgFfACMpag6gWFgrTTo+s86Lp/9q2jxWw09/pTXvO7zwFFgp+wlrQYWqg8H4FFgvZT0vnKMzSVg96DJAOYDr8v/SHEuPCFJWRM/uv2NPQ/sA/4hPUeAoZr6VgKHgL8z6PObeivTRfu/xl4GTpOPS8BjNfStlttFLvIEH1gs9+jcjAXqWyiPOFFi8FcBk+TnbKC+EZnIiwz+WKb76ECjX+71frVSZPCfk6WiBpNVE6+0mhQb/CHgDHrsC9D4TWZNWVc7vljR5I2AeanM4IvBA+jyQoW+vcUGXwz+jC5PV+i7WGzwxeB1dHlEsd9fN/hiUBWnr89/WcdonmjrGOyL09WnG/wMBitxevr0g5/YYBBOR187gp/QYDAuv76kE67sVwVtLKYyWAuXV1/SkQ88A/wuPahvhr5JFZdPX+rgL5JTsx63gA9D3qiKy6MvdfD9cei5WT7bH+HOSW1wYFy1ubYHf27Ao7EHgXmpDDbCVRts84Q7JM8ShHAkhcHGuGqTrV1qAtsDtfj2nLUptXQO7j7MEYKfjDdp6y0KYGONh/+2aOstCuClGj1S27T1thZgK/DiAFXu/S2N/dhft8msMwAfSZB8I8KKmlVuCF/PuuzsOtwLPqFJeECV249vgQX5HD3cwa9MQkWV+6D2yuH8zh7u4M+ahMAqt8cfwLN6Dts/4YZwtTcx16xy/cQ8ou2ztXC3xf5yYDDvXAlW5UbGj+wa7ZehnSK+GNsYW2uxUO9KCMGqXMUkWJWrmIQvrMrVS4JVuYpJsCpXMQlW5SomwapcxST4c2WrcpWSYGe5ikmws1zlbQv9b0o3DFcatwFXhnsiS3oHaAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
export const RejectIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_908_769" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_908_769"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFDElEQVR4nO2dSYgdRRjHS3GJCwlKEieioqC4YQSFRBA0LuhFjbigguQW0ZNeRI0KatTkMAENMYqHoKDoxYsKEtSDniZmNGIQx8EdQRPJEDWr20+KKbF5vNeprv6qa+n6wVxm5tWr7/+vrWtrpQqFQqFQKBQKhUIhEoDDgPOB24GHgU3AB8AU8D0wA/xpfmbM76bM/2wyn9GfPU+nFTqeJAAuBB4C3jaiSrELeAt4EFgcOs6oABYDTwHTdMeXwJPABaqPAIcD1wPvEp5JYAVwhModHSRwj2mvY+M74O5sjQCuBrYTP1PArdl03MAZwPukx3vA6SrxYeRdwG+ky17g3uRqAzDPDCVz4U1grkoB4Ezgc/JjGjhHxQywTPgBKjZ0bMtUjACXA3vIn716RKdiArgW2Ed/OABcp2IAuATYT//YBywJLf7JwI/0l5+AU0OJfxzwSWgFIplLOiaEAc+Hjjwi1nct/lXAP6GjjgitxTVdiT830tnM0HwDHN+FAU+HjjRiHvct/qKePGy58jsw5tOAF5yz1h82+BJ/vnkCLNRzEFjowwC9o6Bgx/0+FtF1L1+w4yutmaQBV1h+ceF/LpM0YLyScMGOtZIG5LjC5ZvPpMQ/zXtW8+UUCQNuCh1FwiyXMODR0FEkzCoJA14PHUXCvCphgF5wKLixVcIA/VBRcGNawoCdjl9egB0SBpQJOHcOFAPCclDCgJ8DB5EyMxIG6PNUBTd+kDBgi+OXF2BCwoDyIObOaxIGlKkId1ZLGHBLiwz0nRskDDg3dBQJMya1HrwjdCQJ8kVr8SsmvBI6mr4vSd5JP/gFeBZYCTwBbGuR1qWSBiwE/iZvtgALhjS/6xxPVMqeLQbeIV8mgRNqYl8ddGOWycTN5MmEPlhuEf8ay/T05uX5Pgw4KsPR0GRdyXesCePi4lcysJaelfyGNUGfIV6kfGF2SOs98L0q+Q1qwiPKNxlsU5xwKfkWNeFrYI6MyvVffJKpar0r+TU1QQ/Rr1RdYR5SelnyR9SEZ1SX6IPJwLdkKD6zdx1tBpY20OPIQ/x9qUlTrgAAN5JZs8Os+NoszW59D4aAThdXrvD5GDixbZrVxPVNUrFPL8xzEJ+KCdY1YUTJ12n4aQpNh7wz4om1BS3Eb2XCCPG9mLCchO9voF58JxMOIb4XE14kPlZa5l13jjZYmWAp/n9sljJgDvARCV4bAFxkLve2obZjHuhwbdJy7l9GHWWKqT/YZntUtGGpHSqcRBpSx1n/IB7WNci7s4BRiF/JzB2R3SU03iDvjZujoM1OTSCriIs1DfLetDTHUfKHBLKefpgQn/iVy7s3EhfjnpqjuMQf2FWgX6jT15qwO5j4AyZsjOAOnw+Bx/QlGk1uMmlhQnjxB5ojqfXk7Wb1aVflxt495hJVvR9nK/CGudtOvxtmCXBsy/w3NSEe8asA9wF/tVFfhcl3HgZULvr+NRUDaDbOHzSh9XqCF/T7u8xbixqTiPhJmDDmcv6sw/xJPQtE3RwdbXYjR2WAQMlPpyZogNts+wXlmWymIpoCnGUWrYMZ4DKrGdVMqNCrDh8wD06dGtBmVlNyUScKmBXj064MyGZBxlNt2O/TAMn5/OxqggY428zj+DLgueQX5TuaS1qhS5enycKXJMRvWBNENwp3AhL3cI424WUJ8TvfmJULDK8JbbcmDqsJ6ZX8QCaIjFQGTCjiKzsTNkgOE+u2p/8LLe7jnBs41uIAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export const SendIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern3332)" />
      <defs>
        <pattern
          id="pattern3332"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_914_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_914_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6UlEQVR4nO2cX2hOYRzHzzYUSSQN05IboUZRSsrV5kZCuduIe7lAblxwZ1kKN5bcWC25NNHcSEkJSXaBVsQsWZKZWJt9dNop22vnfZ/3vM/fc36f+z2/5znfd9/OPue8iyJBEARBEARBEAShZoDVwHHgeu2rCUoAC4GDQB8wwTQn1H5ayARQD+wEuoFRZvMHaMq2slAWYBNwFnhHOv3lVxGy9voz1GivboKg2usqjAGL/19RqLXXVblReZKQpddVaZ29uqCr11X4BDTMPVGIauh1VS7IZTbT66q0lM4vLOjtdRUGoqKDmV5X5WRURDDf6yrE6mFNVBSw2+sqFEM9YL/XVcmvesBNr8dV9rqw6gG3vf41+S0bL5R6YHav/8ANb4DdwJfCqAf+9fp73HIvvpMBXuVePczo9ef4wSVgPnA7t+rBk/v1Un4Dh5P9dZI39eBJr6cxDGxP9tlOntSDR72exgugOdnrVuAnoasHD3s9jVvAomTPq4AhQlUPnvZ6GlPAeaBuxt6fkI37Li+6z72eRrzP/TPOUAf0kp0OFxfe915P42Pc8yVnOUN27KmHgHo9jUdAY8mZ9iUdnhV76gG4TLhcAxaUnKdFQ2222QygLsAQJoHTc5xlOTBY49r21UNgIXwH9sxxhlgzPNCwvhv1EEgIb4ENKfu/qmmGO/XgeQj9wNKUfcc3ETpwrx6SEK7gF93AvJT9tmr8A9EP9eBRCOPA0TL7XAeMaJrlh3rwKIQRYFeZ/S2JK0PjPHfqwcMQXgJrK6iSO5pn2lcPnobQF3+6K+zpouaZfr/1YCmEqcRk1lfYyyEDs3si3zEcwi+VF5+AHckjRt3YUw8ehjAEbFOY3Qx8Rj9hvfWgOYTHwEqFmfGDlaeYIZy3HjSH0BtfWMVZNzGH3289GAhhci6TWWbOOczhXj1YDmEU2FvF+geSuyNT+KEeLIUwCGysYt0tyf25KfxSD4ZDeAisqGK9RuADZvFPPRgKoTt+WFLFOguSwEzjp3rQGMIEcCzDGvFzXtP4rR40hNBZzmSmEf8DJOzgv3qwDdNfmohvUW0QhnqwBbAe+Gbxjelw1INpgGXJw3ZbhKceTAE0AHexS5jqwQTYf9oWtnrQCXAE+4SvHnTA9Kvvqt/R1UV+1EOtkO3LcrWSL/UQ4NsWHa7PXeQQxnKrHgIJocf1WYseQpvrcxY5hGFRD25D6FKZL0TGQtgsF9ddCKIeHIcg6sFhCKIeHIcg6sFxCKIeHIYg6sFxCD3aNyBE1YQg6sHhl8mHRT24DaHL9HwhKhuCqAeHIQzIp9NtCKckALchNEkAgiAIgiAIgiBEjvkL4sRvdQA+QCoAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export const BillIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_918_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_918_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2dS6sURxSAK1ETIkbxcUWiUWIuuNBtJCG60aUrX4kPcBfIP/C5mEXUi4QQLldDyMIfIMlCReLClTtxEx9JCG58gUGjiyzU4ZpPDtPKYOZ2V1c/TnX3+WBgYKa6zzlf3+7qquo7zhmGYRiGYRiGYWRANu+ntF3Q9vauajwS2JrSdnvb27uq8UjgT2DRiHaLgL/a3t5VDX7cBXYC85PXds/kG98+FgGdxZkAXUyAMiZAGROgjAlQxgQoYwKUMQHKmABlTIAyJkAZE6CMCVDGBChjApSJToBrOMSWb3QBdS3f6ALqWr7RBdS1fKMLqGv5RhdQ1/KNLqCu5RtdQF3LN29AXcOZAF1MgDImQBkToIwJUMYEKGMClDEBypgAZUyAMiZAmegEVB5QBgE17AOXgW+BfcDnwEpgIfBW8pL3q4ANwFfAaeAP4D9XNS0V8AK4COwG5hXY1/8eby2dlgn4BzgCrHBNoSUC+sCPwJhrGi0Q8CvwkWsqDRYwDfSAt12TaaiA+8BG1wYaKOAOMO7aAs3iNvBxQI6zgM+AQ8DPwE3gcXLx7ifvbySfHQQ+re3URnN4AKzOmduHwARwL2B/8h9WjlfepaUZTAObcuQ0lnRLn5ewb9nGKWBxlwUczpHPnuSGrGweAV92UcBFn/MxMAf4qYZ4fgBmd0VAH1jjkcNc4EKNcZ2XfXZBwKTnkV9n8YclFP9LIF6eAEs84q/jtDMTp2oX4CIC2Is+XxRNIhcuEoDFwEP0eeTzl5qWSC5cJDDo59fRCbjl8b2pIonkwkUAsKKkm6ysm79dyXTl1YzvPgOWhyaTCxcBDIYXqj7yt71xZ/1bRptjocnkosxChiA3Zck4TaVH/oj9ZkmQ8aZZIQnlwinDYFTTl1vJ0Rx05M8g4VpK+/UhCeXCKcNgSNkHOVqXSEE9JaQW31PCgZCEYmNzRrwyZu9T/NcT9B4SvIo/tL0TM2znTBsEjGfEKxMnaVwbtToiRUI/7TcGRmynl7bvNghYkBFv2lDz78CylLZbki5jFcUXHrZBwJyMeJ+HFH+EhLKLLzzz3d7whmPj3UABJ3LkvLWC4rdGwFiBU9BE7gKUV/zWnILGC16Ee0UKXqD4rbkIbyyhG9pTKH5wN/Rf4uLrkm7EJmouvrA/ZGeySCkmTmbEK4umfOnVWHzhkxAB3xMXV0oejOvVVPzbQavpgHXJCGAsvACWZsQsK9YoU0LB4gtHcxd/aOcniYt9FUzI9Cos/lPggyIC3gEuEQ/nPGKW5YIUlVBC8b2Wz/hKmIrkdDQtTy16TMrLhHiwhJKK/7dMWxYWMBTUWuA74LpyF/WYR6wyZxtCr6TiCztcl2GwVlOL4qeepsPg4YtfFIp/rtRFuk2GweJcWatZF2eB97TzjgpgdmDPKC+TduSnIGs1K1qyKL2dbl9wfUl+rnzqjenHIjdZk6V2NbsCsFy6s8mjrSFjO98UusM13CsRMoC3XtbtyJh9snJCZtZkOENe8l6Wsshn+2VUM/Qx1Zc0pRnznlkyMgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PaidIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.1322" cy="15.415" r="15" fill="#6DE981" />
      <path
        d="M11.3059 18.2909L6.32748 14.7926L4.6322 15.9754L11.3059 20.665L25.6322 10.5979L23.9489 9.41504L11.3059 18.2909Z"
        fill="white"
      />
    </svg>
  );
};

export const UnpaidIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="48" height="48" fill="url(#pattern34234)" />
      <defs>
        <pattern
          id="pattern34234"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_370_1415" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_370_1415"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const TrashIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern4867)" />
      <defs>
        <pattern
          id="pattern4867"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_924_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_924_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2cPW7VYBBFL1IKKAApBbAB0iNBQ0GTsABAdDRkBWEFUFKFBfCzAiioYQWwgEBaFAkk6CAUSBxk6YUCPXksPCN/Y8+p373j8ZfiWec5UlEURVEURVEURUMAjxjP46n3WPLNP6EOYcKbf0IdwoQ3fz6H8HeVYi11ABNTBzAxdQATUwcwMXUAE1MHMDF1ABMz5SNCURRFURRFURQLAthneeyrFYAHLI89tQJwh+VxW60AXGN5XFUrABdZHhfUCsAp4Jjl8LPbWS0BHLIcPqo1gLcshzdqDeCFx2ay54TmB/Jcc/1Fm+w5ofmBPFRrALsem8meE5ofyH21BrDjsZnsOaH5gWyrNYAtj81kzwnND+SyWgM4Dfweu5nsOaH5AXQ7nlGLAF/Gbid7Rmh+AJ/VKsD7sdvJnhGaH8A7tQrwaux2smeE5gfwUq0CPBm7newZoflUIiZCzMieEZpPJWIixIzsGaH5VCImQszInhGaTyViIsSM7Bmh+VQiJkLMyJ4Rmk8nYrzFjOz+0Hw6EeMtZmT3h+bTiRhvMSO7PzSfTsR4ixnZ/aH5dCLGW8zI7g/NpxMx3mJGdn9oPp2I8RYzsvtD8+lEjLeYkd0fmk8pYjzFjOzu0HxKEeMpZmR3h+ZTihhPMSO7OzSfUsR4ihnZ3aH5lCLGU8zI7g7NpxQxnmJGdndoPqWI8RQzsrtD8ylFjKeYkd0dmk8pYjzFjOzu0HxaEeMlZmT3hubTihgvMSO7NzSfVsR4iRnZvaH5tCLGS8zI7g3NpxUxjmLmrNHbi5E9/5/XtKtsjBAzt4zeXoIeEHeUjRFi5gOw2dPbS09uc8RPZraUjU5ejBAzn4C7wLk1vb2s+fy51V/+4exFTMQbMw2QR8REvDHTAHlETMQbMw2QR8REvDHTAHlEzL90EoP87CkrwE3ys62srJ48M/8jpx/rvgqnAnhGXp4qO8Al4Bv5+NqZPc0B4DrwnTwcAzc0J4ArwAHtc9Bdq+YIsAHcA14DR8Cvqe/26hqOVtfUXdvG1PepKIqiKIqiKArNmj/op6GhrwqdFQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PlusIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 8C25.956 8 8 25.956 8 48C8 70.044 25.956 88 48 88C70.044 88 88 70.044 88 48C88 25.956 70.044 8 48 8ZM48 16C65.7205 16 80 30.2795 80 48C80 65.7205 65.7205 80 48 80C30.2795 80 16 65.7205 16 48C16 30.2795 30.2795 16 48 16ZM44 28V44H28V52H44V68H52V52H68V44H52V28H44Z"
        fill="white"
      />
    </svg>
  );
};
export const OptionIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="96" height="96" fill="url(#pattern9r3)" />
      <defs>
        <pattern
          id="pattern9r3"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_933_767" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_933_767"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABEklEQVR4nO3aQWrDQAwFUB3EXhbfvRjfrNDMBVQM7aabhkypGus9mF0CYr61GX4EAAAAAPwva0TsETEiIn8452+OiNiqh77S5b/dcfHfz/mfpXr4K9gfuPyv81o9/BWMiQBu1cNfQU4eBPDc0gYIoLW0AQJoLW2AAFobExvwXj38FRwTAZzPGEzaJh7jXtz+71g+H9Zud77/nF++ywcAAACAB6y6oXVW3dBau25oraEbWiu1IgTQWtoAAbSWNkAAraUNEEBrQze01qEbWmvTDa236IYCAAAAwN9YdUPrrLqhtXbd0FpDN7RWakUIoLW0AQJoLW2AAFpLGyCA1oZuaK1DN7TWphtab9ENBQAAACCe3Af+ttJ6DV5jIAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const PayIcon = ({
  width,
  height,
  className,
}: {
  width: any;
  height: any;
  className?: any;
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="42" height="42" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_370_1410" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_370_1410"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD9UlEQVR4nO3dS4iOURzH8eM2rhELt7GwkHIXUpaykIWUUjaUiJqFrZ2xcA3DaFxCcglZWIjJQmaBUIMSNm4jQnK/jJh5+eo0ZzEN5n2e85zncs77/6znfc7v/J/3cs55zvOMUkIIIYQQQgghhBBCCCGEEBkDpgD1wH3gG8X3zWTdDUz29g0D9AX2Ab/wl86+F6hSHha/iXBc9uokAPsJT4Py6Dv/F+EpAZNU0dHxgxuqOlV0wAPCdU8VHfCVcH1RRUfgVNEROFV0BE4VHYHLu75CCCEqEDAEOJ53jooEzANeyCggY0A/YGvn1c2sM1Qss6x8V8bBGQN6AeuAnzYTEQKXdvHHAleSBCBwaRZ/eZSlZDkBjgHDgXOu3gEEznXxFwCvXAYgcK4KPxg4kkYAstGU14V/F8WfAzxKKwDpegksMe2sJwdJCt8D2Jj0nZPTCSgBu4BBndrpCVwgY7bF7w2cziIA7jUDM/7T1lDgCR6cgNqsAuDOZ2CtnhiWaW868J2M2BR/HNCWVQDcOAtUx5zDFPYEbM4yAMk8AxbG7mRHu3ondupsgt3JMgB22oHtwECb4pt2q4AbpMwm2IcsAxDfbWCWbeG7tD0q7sQyLptQmQYguk9AjR5O2hb8P+3PNZ+oVNgEyjQA0ZwHxtgWOUKGba77HbX//wqTaQCgtZuXP9XrTwkWDY8CMyP8bf8ks32nm3NdJ7Dcnt4GbAEGWM7gVwHvzbFagGE5DU3jb093nSBCe3u6vOSa7d2G+o4U4Oo/Ylws99thPgXvHHd/p00nnIpYtJIZfa3W72CLzLp4m8pMIDdEOM5Bh13XfZpY+BOgAcuAEcoCMB94HLEg3Q5fgRUOu15v059cToANYCRwKmac02WOOdVRty8BfWw75pRViG6YZeU1wEeLOC1ljj06YXfbzR3zdsU3IVyL/Z1eZu/R9QRZfnf3Y2yu/MX1yeyH2gFMUEnhXrWDTAPMjrukq7RvVNHh3jwHGwGeOspyQhUd7p1MsFB2xmGOdi+eZoJ7bXFWL+n4ka0x360urVQ+IB3P9TbGCG1PA26m0H6t8gXp+WAmXH8N0YBqs4shjWXhQ8onpE9fADmmlwbouKrV6PIadBd6G0pv5RPC0dx5X5A3CMMT27Wl3OG/t8B45Sv81qr3siqf4a8SsEj5Dn/VqBDgp1oVCvxzWIUEvzR6N9EK6CF6zV5OtAJ5jORjvfFKhchc0yz608onqlDpixZmTF1E7cBiFTrzCPai+QEsVZXA3LygH8FeFA+B2aqSmJPQkPPX0WvzJJZ+qlKZvZt1eqdvykPUktkcews4oO/90v/YIe/+CyGEEEIIIYQQQgihHPkDgwyv5m2v2AMAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};
