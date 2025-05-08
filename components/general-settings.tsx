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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"



const generalSettingsSchema = z.object({
  companyName: z.string().min(2, {
    message: "Şirket adı en az 2 karakter olmalıdır.",
  }),
  contactEmail: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  contactPhone: z.string().min(10, {
    message: "Geçerli bir telefon numarası giriniz.",
  }),
  address: z.string().min(10, {
    message: "Adres en az 10 karakter olmalıdır.",
  }),
  description: z.string().optional(),
  workingHours: z.string().optional(),
  isShopOpen: z.boolean().default(true),
})

export function GeneralSettings() {
  const form = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      companyName: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      description: "",
      workingHours: "",
      isShopOpen: true,
    },
  })

  function onSubmit(data: z.infer<typeof generalSettingsSchema>) {
    toast({
      title: "Ayarlar güncellendi",
      description: "Genel ayarlarınız başarıyla kaydedildi.",
    })
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="isShopOpen"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Dükkan Durumu</FormLabel>
                <FormDescription>
                  Dükkanınızı açık veya kapalı olarak işaretleyin. Kapalı olarak işaretlenmesi durumunda web sayfanızda bir bildirim gösterilecektir.
                </FormDescription>
              </div>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    {field.value ? "Açık" : "Kapalı"}
                  </span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şirket Adı</FormLabel>
              <FormControl>
                <Input placeholder="Araç Kiralama A.Ş." {...field} />
              </FormControl>
              <FormDescription>
                Bu, müşterilere gösterilecek resmi şirket adınızdır.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Şirketiniz hakkında kısa bir açıklama"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Bu açıklama web sitenizde ve müşteri iletişimlerinde kullanılabilir.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Çalışma Saatleri</FormLabel>
              <FormControl>
                <Input placeholder="Örn: Pazartesi-Cuma: 09:00-18:00, Cumartesi: 10:00-14:00" {...field} />
              </FormControl>
              <FormDescription>
                İşletmenizin çalışma saatlerini belirtin.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İletişim E-postası</FormLabel>
              <FormControl>
                <Input placeholder="iletisim@arackiralama.com" {...field} />
              </FormControl>
              <FormDescription>
                Müşteri iletişimleri için kullanılacak e-posta adresi.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İletişim Telefonu</FormLabel>
              <FormControl>
                <Input placeholder="0212 123 4567" {...field} />
              </FormControl>
              <FormDescription>
                Müşteri iletişimleri için kullanılacak telefon numarası.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Örnek Mahallesi, Örnek Sokak No:1, Örnek/İstanbul"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Şirketinizin resmi adresi.
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

