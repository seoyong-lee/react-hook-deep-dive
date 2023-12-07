import { useEffect, useState } from "react";

const HookComponent = () => {
  const [states, setStates] = useState<any>([]);
  const [setters, setSetters] = useState<((val: any) => any)[]>([]);
  const [firstRun, setFirstRun] = useState(true);

  type SetterType = <T>(initVal: T) => void;

  const createSetter = (cursor: number) => {
    const setter: SetterType = (newVal: any) => {
      const newState = states.map((state: any, index: number) =>
        index === cursor ? newVal : state
      );
      console.log("setter", newVal, cursor);
      setStates(newState);
    };
    return setter;
  };

  type UseCustomStateType = <T>(
    initVal: T,
    cursor: number
  ) => [T, (newVal: T) => void];

  const useCustomeState: UseCustomStateType = (initVal, cursor) => {
    if (firstRun) {
      const newStates = states;
      newStates.push(initVal);
      const newSetters = setters;
      setters.push(createSetter(cursor));

      setStates(newStates);
      setSetters(newSetters);
      setFirstRun(false);
      return [initVal, createSetter(cursor)];
    }

    const setter = setters[cursor];
    const value = states[cursor];

    return [value, setter];
  };

  const [firstName, setFirstName] = useCustomeState("Rudi", 0);
  const [lastName, setLastName] = useCustomeState("Yardley", 1);

  return (
    <div className="w-full flex flex-col place-items-center justify-center">
      {firstName} {lastName}
      <div className="flex w-full justify-center gap-2 mt-10">
        <div className="w-[10rem] h-10 grid gap-4">
          <button
            className="w-22 h-10 bg-black"
            onClick={() => {
              setFirstName("Richard");
            }}
          >
            firstName1 - Richard
          </button>
          <button
            className="w-22 h-10 bg-black"
            onClick={() => setFirstName("Fred")}
          >
            firstName2 - Fred
          </button>
        </div>
        <div className="w-[10rem] h-10 grid gap-4">
          <button
            className="w-22 h-10 bg-black"
            onClick={() => setLastName("Jackson")}
          >
            lastName1 - Jackson
          </button>
          <button
            className="w-22 h-10 bg-black"
            onClick={() => setLastName("Frank")}
          >
            lastName2 - Frank
          </button>
        </div>
      </div>
    </div>
  );
};

export default HookComponent;
