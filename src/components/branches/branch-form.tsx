"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";
import { Textarea } from "app/components/ui/textarea";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "app/components/ui/file-upload";
import {
  type BranchSchema,
  branchSchema,
} from "app/app/schemas/branches.schema";
import type { ICountry } from "app/types/country";
import { fetchCountries } from "app/app/actions/countries.action";
import { fetchDepartments } from "app/app/actions/departments.action";
import { fetchCities } from "app/app/actions/cities.action";
import { FormCombobox } from "app/components/branches/components/form-combobox";
import { IDepartment } from "app/types/department";
import { ICity } from "app/types/city";
import { DropzoneOptions } from "react-dropzone";

function convertObjectToArray<T extends ICountry | IDepartment | ICity>(
  object: Record<string, T>
): T[] {
  return Object.values(object);
}

export default function BranchForm() {
  // -- States
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // -- Events
  async function getCountries() {
    setIsLoadingCountries(true);
    try {
      const fetchedCountries = await fetchCountries();
      const countries = convertObjectToArray(fetchedCountries);
      setCountries(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch countries. Please try again.");
    } finally {
      setIsLoadingCountries(false);
    }
  }

  async function getDepartments(countryId: string) {
    setIsLoadingDepartments(true);
    try {
      const fetchedDepartments = await fetchDepartments(countryId);
      const departments = convertObjectToArray(fetchedDepartments);
      setDepartments(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to fetch departments. Please try again.");
    } finally {
      setIsLoadingDepartments(false);
    }
  }

  async function getCities(departmentId: string) {
    setIsLoadingCities(true);
    try {
      const fetchedCities = await fetchCities(departmentId);
      const cities = convertObjectToArray(fetchedCities);
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to fetch cities. Please try again.");
    } finally {
      setIsLoadingCities(false);
    }
  }

  // -- Form
  const form = useForm<BranchSchema>({
    resolver: zodResolver(branchSchema),
  });

  // -- Dropzone
  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  // -- Handlers
  const handleFiles = (files: File[] | null) => {
    setFiles(files);
    if (!files || !files.length) {
      form.setValue("imagen", "");
      return;
    };

    // Base64 encoding
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64data = event.target?.result;
      if (base64data) {
        form.setValue("imagen", base64data.toString());
      }
    };
  };

  function onSubmit(values: BranchSchema) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  // -- Effects
  useEffect(() => {
    getCountries();
  }, []);

  // -- Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <FormCombobox
                      options={countries}
                      value={field.value}
                      onSelect={(value) => {
                        field.onChange(value);
                        form.setValue("departamento", "");
                        form.setValue("city_id", "");
                        getDepartments(value);
                      }}
                      placeholder="Select country"
                      label="Country"
                      isLoading={isLoadingCountries}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <FormCombobox
                      options={departments}
                      value={field.value}
                      onSelect={(value) => {
                        field.onChange(value);
                        form.setValue("city_id", "");
                        getCities(value);
                      }}
                      placeholder="Select state"
                      label="State"
                      disabled={!form.getValues("pais")}
                      isLoading={isLoadingDepartments}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <FormCombobox
                      options={cities}
                      value={field.value}
                      onSelect={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="Select city"
                      label="City"
                      disabled={!form.getValues("departamento")}
                      isLoading={isLoadingCities}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="imagen"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={handleFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
