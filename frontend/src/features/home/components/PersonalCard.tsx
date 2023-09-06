const PersonalCard = ({ item, index }: any) => {
  return (
    <div
      key={index}
      className="bg-white h-[300px] w-[200px] rounded-xl p-3 mt-6 ml-6 flex flex-col items-center hover:cursor-pointer hover:border-green"
    >
      <div className="h-4/6 w-auto flex self-center rounded">
        <img className="h-full rounded-xl p-2" src={item.image} alt="img" />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-bold">
          {item.firstName} {item.lastName}
        </p>
        <p className="text-xs">{item.title}</p>
        <p className="text-xs">
          Contact: <br /> <span className="underline">{item.email}</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalCard;
