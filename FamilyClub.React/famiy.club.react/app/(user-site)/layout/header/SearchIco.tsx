import Image from "next/image";


export default function SearchIco(){
    return(
        <>
         <input
                type="text"
                className="bg-transparent outline-none w-full text-sm"
              />
              <div className="relative cursor-pointer">
                <Image
                  src="/images/zoom_out_24px.png"
                  alt="search"
                  width={30}
                  height={30}
                  className="object-contain"
                  priority
                />
              </div>
        </>
    )
}