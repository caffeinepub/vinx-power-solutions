import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllInquiries } from "@/hooks/useQueries";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { Inquiry } from "../backend.d";

const sectorLabels: Record<string, string> = {
  electricalContracting: "Electrical",
  indianRailwayProjects: "Railways",
  civilInfrastructure: "Civil Infra",
  carify: "Carify",
};

const sectorColors: Record<string, string> = {
  electricalContracting:
    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  indianRailwayProjects: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  civilInfrastructure: "bg-green-500/15 text-green-400 border-green-500/30",
  carify: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

function formatDate(ts: bigint): string {
  try {
    // Motoko timestamps are in nanoseconds
    const ms = Number(ts) / 1_000_000;
    if (Number.isNaN(ms) || ms === 0) return "—";
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function getSectorKey(inquiry: Inquiry): string {
  // The sector can be an object with enum key or a string
  const sector = inquiry.sector;
  if (typeof sector === "string") return sector;
  // Handle Motoko variant object: { electricalContracting: null }
  const keys = Object.keys(sector as object);
  return keys[0] ?? "unknown";
}

export default function AdminPage() {
  const { data: inquiries, isLoading, isError, refetch } = useGetAllInquiries();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy-deep border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Site
              </Button>
              <div>
                <h1 className="font-display font-800 text-xl text-foreground">
                  Admin — Inquiry Dashboard
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Vinx Power Solutions Pvt Ltd
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-gold/15 text-gold border border-gold/30 font-medium"
              >
                {inquiries?.length ?? 0} Total Inquiries
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetch()}
                className="border-border hover:border-gold/50 text-foreground"
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {isLoading && (
          <div
            data-ocid="admin.table"
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted-foreground text-sm">
              Loading inquiries...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="text-muted-foreground text-sm">
              Failed to load inquiries
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-border"
            >
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {inquiries && inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-2">
                  <AlertCircle className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium">No inquiries yet</p>
                <p className="text-muted-foreground text-sm">
                  Submitted inquiries from the contact form will appear here.
                </p>
              </div>
            ) : (
              <div
                data-ocid="admin.table"
                className="bg-card border border-border rounded-xl overflow-hidden shadow-card-lift"
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider w-8">
                          #
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Name
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Email
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Phone
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Sector
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Message
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display font-700 uppercase text-xs tracking-wider">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(inquiries ?? []).map((inquiry, idx) => {
                        const sectorKey = getSectorKey(inquiry);
                        const rowIndex = idx + 1;
                        return (
                          <TableRow
                            key={`${inquiry.email}-${idx}`}
                            data-ocid={`admin.row.${rowIndex}`}
                            className="border-border hover:bg-secondary/40 transition-colors"
                          >
                            <TableCell className="text-muted-foreground text-xs font-mono">
                              {rowIndex}
                            </TableCell>
                            <TableCell className="font-medium text-foreground text-sm">
                              {inquiry.name || "—"}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {inquiry.email || "—"}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {inquiry.phone || "—"}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                  sectorColors[sectorKey] ??
                                  "bg-secondary text-muted-foreground border-border"
                                }`}
                              >
                                {sectorLabels[sectorKey] ?? sectorKey}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm max-w-xs">
                              <span
                                className="block truncate max-w-[200px]"
                                title={inquiry.message}
                              >
                                {inquiry.message || "—"}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                              {formatDate(inquiry.timestamp)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
