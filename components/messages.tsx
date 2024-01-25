"use client"

import { client } from "@/lib/supabase"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

interface Message {
  id: string
  content: string
  createdAt: Date
}

export default function Messages() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("/api/messages")
      const data = await res.json()
      return data as Message[]
    },
  })

  useEffect(() => {
    const messageChannel = client
      .channel("message")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "message",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
      )
      .subscribe()
    return () => {
      client.removeChannel(messageChannel)
    }
  }, [])

  return (
    <ul className="ml-3 flex grow flex-col-reverse overflow-auto">
      {query.data?.toReversed().map((message) => (
        <li key={message.id}>
          <div className="text-sm">{message.content}</div>
        </li>
      ))}
    </ul>
  )
}
