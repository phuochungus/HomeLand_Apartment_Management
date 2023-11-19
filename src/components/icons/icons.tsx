import { SortOrder } from "@/models/enums";
import { useState } from "react";

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
  initialOrder = SortOrder.DESCEND,
  onChangeOrder,
}: {
  width: any;
  height: any;
  className?: any;
  initialOrder?: SortOrder;
  onChangeOrder?: (order: SortOrder) => void;
}): JSX.Element => {
  const [order, setOrder] = useState<SortOrder>(initialOrder);
  return (
    <div
      style={{
        width: "fit-content",
        display: "inline-grid",
        verticalAlign: "super",
        cursor: "pointer",
      }}
      onClick={() => {
        if (order) setOrder(order ? SortOrder.DESCEND : SortOrder.ASCEND);
        else setOrder(SortOrder.ASCEND);
        if (onChangeOrder)
          onChangeOrder(order ? SortOrder.DESCEND : SortOrder.ASCEND);
      }}
    >
      <svg
        stroke="currentColor"
        fill={order ? "black" : "grey"}
        stroke-width="0"
        viewBox="0 0 320 400"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>
      </svg>
      <svg
        stroke="currentColor"
        fill={!order ? "black" : "grey"}
        stroke-width="0"
        viewBox="0 70 325 400"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
      </svg>
    </div>
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
    <svg width={width} height={height} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="96" height="96" fill="url(#pattern998)"/>
    <defs>
    <pattern id="pattern998" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlinkHref="#image0_833_767" transform="scale(0.0104167)"/>
    </pattern>
    <image id="image0_833_767" width="96" height="96" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADrklEQVR4nO2cy28NURzHPxKPSsqqhEgsUAmJJiJBUsGu/4BXI9aCna1odEMi3Yi36tLGxl+gxQIpEY8lK0L0dkFoq+oxctLfjeu60Rl3Zn5z7/1+kt9mOr2/1zlnfmfOmQNCCCGEEEIIIYQQQhSPpUAvMAiMAiVgxqRk164BB4Al3sY2E+uBIWASiGJKuPc60OltfCOzGBgAviUIfLWE3nEWaPN2ptHoBF7UEfhqeQCs9HaqUdhsY3qUsrwBuryda4SWX8og+JVJWOHtZFFpA55mGPyyPLbni6hiIIfgl6W/Wnmrs77OaiepfNZQ9CdDOQa/LJecGlshZ7iTDgmY0Ix5ll6H4Jdlv9nQ0gw6JuCqt/NFYNQxAWGG3PKMOyZgrOWjD3x1TMC0EoAS4M24hiBfRvUQ9uWaYwKuOPteCA44JmCvt/NFoN1eC+Qd/AnTLZhdQM87AWHoExUrYTM5Bj/MPdaUlYtZzuaYgDOmU1QtST7IIfj3gUWVisVvwoL56wyD/xZYVaFP1KDLdi+kHfyQ2E21FIq/WQbcTXnY0XaUhCyy3QsTdVY7pzXm18cKW0BPkogJW+1SqZki7baGG97fPLTFlK8mY3btMrBPM1whhBBCCCGEEEIIIZJ/ObPF9g31ATeAYfvK8ZV9zjptUrJr4W+37d4++9/wGzo7Yg4WANuA48AtWzrMYjnylunYZjpblnnAVltwGXb6RmzSdPebLcGmpiY4uMPe2b9zCHgUo4cE27qbLRnLgRPAy5QD9gk4ZPIp5d9+aTaHtemGZaN9//slg9b6CFhXoWudXUtbzxfbNrmBBmK1rcd+zyAgP4FzwMIaeucDp4AfGegNv3kTWEuBWWil33QGAYiA90BPDDt67N4sbAi+nSxiBdWV8gFLUQ0ZSWDPSMa2PC/SJq+9Oe7v3x3Dnt05HvixB2eO2Lich8NRzF6QdeuvlOD7YZw4mNEDL6qjF+TV+ivlh73yyP18nykHZyPg6D/sOuZk01TeR2Tec3I0KmAPKMudvILf7ehkNMfstMPZtu3NfrzMWAz7xpr9+Jtnjg6OFKwKqpYnOcSfj44OXohh30VH+z7kEH835yKbd8zFUWcbM8fTuV0x7Av3KAEZBWFZjAQkrYTSboCZ0wjHi5WUgPQTMJwgAUkqobQbYNP2gPMJbAzVkhLgUAH9TyWUlJbtATsT2JikEkrb/6ZNQEcCG5NUQmn7nzkewX//H3bGfSeUtv9CCCGEEEIIIYQQQlCLX+PxlBqSeNXFAAAAAElFTkSuQmCC"/>
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
    <svg width={width} height={height} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="96" height="96" fill="url(#pattern999)"/>
    <defs>
    <pattern id="pattern999" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlinkHref="#image0_833_768" transform="scale(0.0104167)"/>
    </pattern>
    <image id="image0_833_768" width="96" height="96" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO2dyWsUQRSHf0aj4oaBuOFBZXLRJAgq/gfiwRgPiogiasT15i1B8SSoiFldTiqYg+JNcIOoBxH1oAET14OKoiKCWxJjNNGWIjUwhMlUVXdt0/U+aAikp7av+/XrmqoEIAiCIAiCIAiCIJKyEEAjgCcA+gBEgoPQRCmAJgCDEoNOAgwM/nXFgac7QCNNMQefQpCmmK8adkiAJ1c/3QEaYNkOCXBILwlwC4UYx5AAx5AAx3gnoBpAS85cSB//uRlAlYsGhcIEAKcA/C1wNQwBOAFgvOvGpnHwbyukY7dIgl5Ox8iF2zS3IViqBWGnUDiqdN34NNCS4FW80XXj08DTBAK6XTc+DfQkENCjWNcYTeekiiQCfijUMw3AJYnzLgMoUyg3cnwURQiakjPtK4Kd08U/E4SAZgsP4YsKDc6edyEUAVU8pVSteAjAIonylyo2OPfcJSEIAJ9eUK24RbLsswkEnAlFAJvbualQaQdfyiFDVwIBr0MRkJXQJghHQ/zKlx38fF/5icg9dyAkAVkq+cO1mw9eL//5uGTMH8mnBAJ6QxSgm3sJOvcwRn0kYAT7EwxKPdQhASOYAaA/xsCwz5RDHRKQh80xBmY74lE0AmYDOAjgPoDveQr+wn93IOaVOJKjCp06DDdzW9YE7JHcfJA9WKe2ITnrJepi57ia27Ii4EiCyq4AqEg4QJGpW1rTYlujAjZoqJC9HB0CMMlTAZUx57aMC5gI4L3Git8CWOehAPA3eu8ErDXUgA6+ycEnAapzW1YEnDPYiD8AjgGY6omArIRWC+FImjcWroYPADYJvte1JWC0uS0nAuZbGPzI9hWlCSvt2erBwEYhCzAZ/yMS4Ef8j+gOsBP/PwJ4kCIBPYL2yC6PsRb/WTgrAVAH4HMKBLwQtKfGt/i/Jafs6fytc7CIBVwVtKdb8v3GWvyfl6eOxQDuFKmAvRJtYqv6auOI0B3/mcykRJ4JmGvyb0Xojv9skVXaBIDvjTMiwGT8T5OAWQC+mRBgI/6nQQBjRcxQVFTx32cBjJ0xZk+t5v9pF8BYqRiOjDxY8h1MaAgCss+Ek/x7jtjtvaFZAAtpoQjIMgfAbr4Y4dko3yeMyjXNAmSOhkINCo1WBwLaXXfaJ2ocCOh03WmfGM+XjtgU0A9grOuO+8QuB3dBxnWnfaKU77OyKaDWdad9Y4dlAQ2uO+zjXfDKooB21x32kTqJgWN7hWVYIyin03BfihKWmbwUDNxvydnOCkE5vygTij85x+aPRJRI7PnKKF4gwdwFohUAbPJpgURZLMxElAmZ2SzHpjBEsAdtRJlQvLvguWDw2FqfcYJyWKoZUSYUj40Sd8EyQRnsZSuiTKjwnwcrG+Uol3gvWCUQkBF8vj+kTMjEyxTL9UWZ0E9BGUl3UwYtQCaN7KRMyIyAd/wKF3GeMiEzAvZJ3nn1lAkN80/j4D8GMFlSwGrKhIYZ0rjDUWXlQ0ZQXjCZkMzaFdHB/o/iTMV6SygTGmYgz4CybTdfCxxsm9FdvvhoeQL5jygTIgiCIAiCIAgCgfEfuEbpvUxO5DwAAAAASUVORK5CYII="/>
    </defs>
    </svg>
  );
};