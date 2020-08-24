/** Helper function used to find the index of the closest element to a given number */
export function findClosest(target: number, arr: number[]): number {
  const n = arr.length;
  function getClosest(a: number, b: number) {
    if (Math.abs(target - arr[a]) >= Math.abs(arr[b] - target))
      return a 
    else
      return b
  }
  // Edge cases
  if (target <= arr[0])
    return 0
  if (target >= arr[n-1])
    return n-1
  // Binary search to locate the index of the closest element
  let i = 0, j = n, mid = 0;
  while (i < j) {
    mid = Math.floor((i + j) / 2);
    if (target == arr[mid])
      return mid
    else if (target < arr[mid]) {
      // If target is in between mid and mid-1
      if (mid > 0 && target > arr[mid - 1])
        return getClosest(mid, mid-1)
      else
        j = mid;
    }
    else {
      if (mid < n - 1 && target < arr[mid + 1])
        return getClosest(mid, mid+1);
      else
        i = mid + 1
    }
  }
  return mid
}

