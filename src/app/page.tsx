import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-5xl font-bold text-center">Conectado.</h1>

                <p className="text-left text-xl text-[#333] dark:text-[#ccc] max-w-[600px]">
                    Ao redor apenas uma quantidade imensa de informação.
                    <br />
                    <br />
                    Visão, audição, esses sentidos são parte de uma vida antiga.
                    Agora só existe informação pura.
                    <br />
                    <br />
                    O fluxo constante é quase impossível de aguentar, mas não
                    existe escolha. Aprender a lidar com isso é a única opção.
                    <br />
                    <br />
                    As memórias parecem distantes, nem é possível lembrar de
                    como era antes.
                </p>

                <div className="flex w-full gap-4 items-center flex-col">
                    <h3 className="text-2xl font-bold text-center">
                        Agora a única opção é
                    </h3>

                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-4xl h-16 px-5"
                        href="/home"
                    >
                        <img
                            className=""
                            src="/eye.svg"
                            width={80}
                            height={80}
                        />
                        Explorar
                    </Link>
                </div>
            </main>
        </div>
    )
}
