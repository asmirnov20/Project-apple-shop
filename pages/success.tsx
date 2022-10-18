import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { fetchStripeItems } from '../lib/utils/fetchStripeItems'
import OrderConfirmed from "../components/Success page/OrderConfirmed"
import OrderSummary from "../components/Success page/OrderSummary"


interface Props {
    products: StripeProduct[]
}

const success = ({ products }: Props) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div>
            <header className="mx-auto max-w-xl">
                <Link href="/">
                    <div className="relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
                        <Image
                            src="https://rb.gy/vsvv2o"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>
            </header>

            {mounted && (
                <main className="grid grid-cols-1 lg:grid-cols-9">
                    <OrderConfirmed />
                    <OrderSummary products={products} />
                </main>
            )}
        </div>
    )
}

export default success

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
    const sessionId = query.session_id as string
    const products = await fetchStripeItems(sessionId)

    return {
        props: {
            products
        }
    }
}
