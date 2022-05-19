export type Props = {
    id: string,
    date: string,
    status: "onHold" | "fulfilled" | "unfulfilled" | "partially" | "scheduled",
    orderName: string,
    onChangePage: (orderId: string) => void
}
