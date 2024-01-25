"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface MessageFormElement extends HTMLFormElement {
  readonly elements: HTMLFormControlsCollection & {
    messageInput: HTMLInputElement
  }
}

export default function MessageForm() {
  const handleSubmit: React.FormEventHandler<MessageFormElement> = (e) => {
    e.preventDefault()

    const message = e.currentTarget.elements.messageInput.value
    fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        content: message,
      }),
    })

    e.currentTarget.elements.messageInput.value = ""
  }

  return (
    <form className="flex space-x-2" onSubmit={handleSubmit}>
      <Input id="messageInput" type="text" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
