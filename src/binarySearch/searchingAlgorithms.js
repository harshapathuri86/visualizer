export function binarySearchAnimations(
    array,
    left,
    right,
    element,
    animations = []
) {
    if (right >= left) {
        let mid = parseInt(left + (right - left) / 2);
        if (array[mid] === element) {
            animations.push([left, right, mid, true]);
            return true;
        }
        if (array[mid] > element) {
            animations.push([left, right, mid, false]);
            binarySearchAnimations(array, left, mid - 1, element, animations);
        } else {
            animations.push([left, right, mid, false]);
            binarySearchAnimations(array, mid + 1, right, element, animations);
        }
        return false;
    }
}
