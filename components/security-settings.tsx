'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const securitySettingsSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Şifre en az 8 karakter olmalıdır.",
  }),
  newPassword: z.string().min(8, {
    message: "Şifre en az 8 karakter olmalıdır.",
  }),
  confirmNewPassword: z.string().min(8, {
    message: "Şifre en az 8 karakter olmalıdır.",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmNewPassword"],
})

export function SecuritySettings() {
  const form = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof securitySettingsSchema>) {
    toast({
      title: "Ayarlar güncellendi",
      description: "Güvenlik ayarlarınız başarıyla kaydedildi.",
    })
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mevcut Şifre</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Mevcut şifrenizi girin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Şifre</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Yeni şifrenizi girin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Şifre (Tekrar)</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Yeni şifrenizi tekrar girin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Kaydet</Button>
      </form>
    </Form>
  )
}

