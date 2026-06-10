function ModalBox({ children, title }) {
  // why parent has display:flex and direction:column?
  // why not just use the normal block layout?
  // without flex, if we set overflow: auto on child it doesnt work
  // becuase child will grow any way and won't reach the overflow
  // if we set overflow: auto this parent, the content scrolls on padding-box
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md px-2 py-2 w-[80%] max-h-[80%]">
      <h2 className="text-2xl text-gray-600 border-b">{title}</h2>
      {children}
    </div>
  );
}

export default ModalBox;
