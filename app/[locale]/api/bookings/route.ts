import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Update the path as necessary

// GET Request Handler
export async function GET(req: Request, { params }: { params: { locale?: string } }) {
  try {
    // Retrieve the locale safely from params
    const locale = params?.locale || "default-locale"; // Provide a default fallback if locale is undefined
    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const resourceId = searchParams.get("resourceId");

    console.log(`Locale for GET request: ${locale}`);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("startDateTime", { ascending: true })
      .match(resourceId ? { resourceId } : {});

    if (error) {
      console.error("Error fetching bookings:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST Request Handler
export async function POST(req: Request, { params }: { params: { locale?: string } }) {
  try {
    const locale = params?.locale || "default-locale";
    const supabase = await createClient();
    const { resourceId, startDateTime, endDateTime, title } = await req.json();

    console.log(`Locale for POST request: ${locale}`);

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ resourceId, startDateTime, endDateTime, title }]);

    if (error) {
      console.error("Error creating booking:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in POST:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// PUT Request Handler
export async function PUT(req: Request, { params }: { params: { locale?: string } }) {
  try {
    const locale = params?.locale || "default-locale";
    const supabase = await createClient();
    const { id, resourceId, startDateTime, endDateTime, title } = await req.json();

    console.log(`Locale for PUT request: ${locale}`);

    const { data, error } = await supabase
      .from("bookings")
      .update({ resourceId, startDateTime, endDateTime, title })
      .eq("id", id);

    if (error) {
      console.error("Error updating booking:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in PUT:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

// DELETE Request Handler
export async function DELETE(req: Request, { params }: { params: { locale?: string } }) {
  try {
    const locale = params?.locale || "default-locale";
    const supabase = await createClient();
    const { id } = await req.json();

    console.log(`Locale for DELETE request: ${locale}`);

    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in DELETE:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
