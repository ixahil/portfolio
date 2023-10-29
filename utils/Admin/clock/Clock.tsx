import { useState, useEffect } from "react";

type Props = {
  time: number;
};

const Clock = ({ time: initialTime }: Props) => {
  const [time, setTime] = useState(new Date(initialTime));

  const date = new Date().toDateString();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tabular-nums">
      {date}
      {"  "}
      {time
        .toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
        .toLowerCase()}
    </div>
  );

  // const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setDate(new Date());
  //   }, 1000);

  //   return function cleanup() {
  //     clearInterval(timerID);
  //   };
  // }, []); // Use an empty dependency array to run this effect only once on mount (client-side).

  // const getOrdinalSuffix = (day: any) => {
  //   if (day % 10 === 1 && day !== 11) {
  //     return day + "st";
  //   } else if (day % 10 === 2 && day !== 12) {
  //     return day + "nd";
  //   } else if (day % 10 === 3 && day !== 13) {
  //     return day + "rd";
  //   } else {
  //     return day + "th";
  //   }
  // };

  // const formatDate = (date: Date) => {
  //   return `${date.toLocaleString("default", {
  //     month: "long",
  //   })} ${getOrdinalSuffix(
  //     date.getDate()
  //   )}, ${date.getFullYear()} ${date.toLocaleTimeString()}`;
  // };

  // return <div>{formatDate(date)}</div>;
};

export default Clock;
