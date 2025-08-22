import { getContract } from "@/lib/contract"

export async function GET() {
  try {
    const contract = getContract()

    const [nextTicketId, owner, verifier] = await Promise.all([
      contract.nextTicketId(),
      contract.owner(),
      contract.verifier(),
    ])

    return Response.json({
      contractAddress: contract.target,
      nextTicketId: nextTicketId.toString(),
      owner,
      verifier,
      chainId: 97, // BNB Testnet
      name: "HackathonTicket",
      symbol: "HACKT",
    })
  } catch (error: any) {
    console.error("Get contract info error:", error)
    return Response.json(
      {
        error: "Failed to get contract info",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
