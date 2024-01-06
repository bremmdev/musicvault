import React from "react";

const useOptimisticState = <T,>(data: Array<T>) => {

  const [optimisticData, setOptimisticData] = React.useOptimistic(
    data,
    (state, newData: Array<T>) => newData
  );

  //reset optimistic data when data change
  React.useEffect(() => {
    React.startTransition(() => {
      setOptimisticData(data);
    });
  }, [data, setOptimisticData]);

  return [optimisticData, setOptimisticData] as const;
};

export default useOptimisticState;
