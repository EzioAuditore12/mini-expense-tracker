/**
 * Snowflake ID generator — produces globally unique, time-sortable 64-bit IDs.
 *
 * Bit layout (left to right):
 *   [variable bits: timestamp delta] [10 bits: machine ID] [8 bits: sequence counter]
 *
 * The timestamp delta = current time (ms) minus a fixed epoch (`start`).
 * This keeps the numeric values shorter until the year ~2060+.
 */
export class SnowFlakeId {
  private readonly machineBits = 10n;
  private readonly sequenceBits = 8n;

  // Custom epoch: 6 Feb 2026 18:46 UTC (keep 'start' in .env secret in production)
  private start = 1770383795974n;

  private lastTimestamp = 0n;
  private counter = 0n;
  private maxCount = 2n ** BigInt(this.sequenceBits); // 256 IDs per ms per machine
  private machineId: bigint;

  public constructor(machineId: number) {
    this.machineId = BigInt(machineId);
  }

  /**
   * @returns time till now in milliseconds
   */
  private currentTimestamp(): bigint {
    return BigInt(Date.now());
  }

  /**
   * @returns Snowflake integer id
   */
  public generate(): bigint {
    let timestamp = this.currentTimestamp();

    if (timestamp === this.lastTimestamp) {
      this.counter++;

      // Sequence overflow: busy-wait until the clock advances to the next ms
      if (this.counter > this.maxCount) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = this.currentTimestamp();
        }
      }
    } else {
      this.counter = 0n;
    }

    // Compose the ID: [timestamp delta | machineId | sequence counter]
    let snowflakeId = (timestamp - this.start) << this.machineBits;
    snowflakeId |= this.machineId;
    snowflakeId <<= this.sequenceBits;
    snowflakeId |= this.counter;

    this.lastTimestamp = timestamp;

    return snowflakeId;
  }
}
