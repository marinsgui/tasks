import Link from "next/link";

export default function SupportButton() {
  return (
    <div className="absolute z-10 bottom-16 right-14">
        <Link href='/donate'>
            <button className="bg-orange-500 w-24 h-24 rounded-full text-xl duration-200 drop-shadow-2xl hover:scale-110">
                APOIAR
            </button>
        </Link>
    </div>
  )
}
