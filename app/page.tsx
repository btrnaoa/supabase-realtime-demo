import MessageForm from "@/components/message-form"
import Messages from "@/components/messages"

export default function Home() {
  return (
    <div className="mx-auto flex h-svh flex-col space-y-4 px-2 py-4 md:max-w-prose">
      <Messages />
      <MessageForm />
    </div>
  )
}
