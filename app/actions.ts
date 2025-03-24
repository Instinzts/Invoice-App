"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { formatCurrency } from "./utils/formatCurrency";
import { emailClient } from "./utils/mailtrap";
export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requiredUser();
  
    const submission = parseWithZod(formData, {
      schema: invoiceSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const data = await prisma.invoice.create({
      data: {
        clientAddress: submission.value.clientAddress,
        clientEmail: submission.value.clientEmail,
        clientName: submission.value.clientName,
        currency: submission.value.currency,
        date: submission.value.date,
        dueDate: submission.value.dueDate,
        fromAddress: submission.value.fromAddress,
        fromEmail: submission.value.fromEmail,
        fromName: submission.value.fromName,
        invoiceItemDescription: submission.value.invoiceItemDescription,
        invoiceItemQuantity: submission.value.invoiceItemQuantity,
        invoiceItemRate: submission.value.invoiceItemRate,
        invoiceName: submission.value.invoiceName,
        invoiceNumber: String(submission.value.invoiceNumber),
        status: submission.value.status,
        total: submission.value.total,
        note: submission.value.note,
        userId: session.user?.id,
      },
    });
    const sender = {
      email: "hello@demomailtrap.co",
      name: "Async Corporation",
    };
  
    const emailData = {
      from: sender,
      to: [{ email: "willylopezonly@gmail.com" }],
      template_uuid: "3c01e4ee-a9ed-4cb6-bbf7-e57c2ced6c94",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        invoiceDueDate: new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(new Date(submission.value.date)),
        invoiceAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as any,
        }),
        invoiceLink:
          process.env.NODE_ENV !== "production"
            ? `http://localhost:3000/api/invoice/${data.id}`
            : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
      },
    }
    try {
      const response = await emailClient.send(emailData);
      console.log("Email sent:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    return redirect("/dashboard/invoices");
  }
  export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requiredUser();
  
    const submission = parseWithZod(formData, {
      schema: invoiceSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const data = await prisma.invoice.update({
      where: {
        id: formData.get("id") as string,
        userId: session.user?.id,
      },
      data: {
        clientAddress: submission.value.clientAddress,
        clientEmail: submission.value.clientEmail,
        clientName: submission.value.clientName,
        currency: submission.value.currency,
        date: submission.value.date,
        dueDate: submission.value.dueDate,
        fromAddress: submission.value.fromAddress,
        fromEmail: submission.value.fromEmail,
        fromName: submission.value.fromName,
        invoiceItemDescription: submission.value.invoiceItemDescription,
        invoiceItemQuantity: submission.value.invoiceItemQuantity,
        invoiceItemRate: submission.value.invoiceItemRate,
        invoiceName: submission.value.invoiceName,
        invoiceNumber: String(submission.value.invoiceNumber),
        status: submission.value.status,
        total: submission.value.total,
        note: submission.value.note,
      },
    });
    const sender = {
      email: "hello@demomailtrap.com",
      name: "Jan Marshal",
    };
  
    emailClient.send({
      from: sender,
      to: [{ email: submission.value.clientEmail }],
      template_uuid: "9d04aa85-6896-48a8-94e9-b54354a48880",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        invoiceDueDate: new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(new Date(submission.value.date)),
        invoiceAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as any,
        }),
        invoiceLink:
          process.env.NODE_ENV !== "production"
            ? `http://localhost:3000/api/invoice/${data.id}`
            : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
      },
    });
  
    return redirect("/dashboard/invoices");
  }
  
  export async function DeleteInvoice(invoiceId: string) {
    const session = await requiredUser();
  
    const data = await prisma.invoice.delete({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
    });
  
    return redirect("/dashboard/invoices");
  }
  
  export async function MarkAsPaidAction(invoiceId: string) {
    const session = await requiredUser();
  
    const data = await prisma.invoice.update({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
      data: {
        status: "PAID",
      },
    });
  
    return redirect("/dashboard/invoices");
  }