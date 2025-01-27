const NoData = ({ Icon, message }) => {
  return (
    <div className="grid min-h-[80vh] place-items-center">
      <div className="flex flex-col items-center justify-center gap-3 text-light-grey">
        {Icon}
        <p className="max-w-[30.5rem] text-center">{message}</p>
      </div>
    </div>
  );
};
export default NoData;
