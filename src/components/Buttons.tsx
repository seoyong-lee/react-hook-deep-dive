const Buttons = () => {
  return (
    <div className="w-[10rem] h-10 grid gap-10">
      {/* {firstName} */}
      <button
        className="w-22 h-10 bg-black"
        // onClick={() => setFirstName("Richard")}
      >
        button1 - Richard
      </button>
      <button
        className="w-22 h-10 bg-black"
        // onClick={() => setFirstName("Fred")}
      >
        button2 - Fred
      </button>
    </div>
  );
};

export default Buttons;
